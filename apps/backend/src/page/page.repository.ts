import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Page } from './page.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PageRepository extends Repository<Page> implements OnModuleInit {
  async onModuleInit() {
    // vector extension 활성화
    await this.dataSource.query(`
      CREATE EXTENSION IF NOT EXISTS vector
    `);

    // vector 컬럼 추가 (존재 여부 확인 후 추가)
    await this.dataSource.query(`
    DO $$ 
    DECLARE 
        column_exists BOOLEAN;
        index_exists BOOLEAN;
    BEGIN 
        -- 컬럼 존재 여부 확인
        SELECT EXISTS (
            SELECT 1 
            FROM pg_attribute 
            WHERE attrelid = 'page'::regclass 
            AND attname = 'embedding'
        ) INTO column_exists;
        
        IF NOT column_exists THEN 
            -- 컬럼이 없으면 추가
            EXECUTE 'ALTER TABLE page ADD COLUMN embedding vector(384)';
        END IF;
    
        -- 인덱스 존재 여부 확인
        SELECT EXISTS (
            SELECT 1 
            FROM pg_indexes 
            WHERE tablename = 'page' 
            AND indexname = 'page_embedding_hnsw_idx'
        ) INTO index_exists;
    
        IF NOT index_exists THEN
            -- HNSW 인덱스 생성
            EXECUTE 'CREATE INDEX page_embedding_hnsw_idx ON page USING hnsw (embedding vector_ip_ops)';
        END IF;

        -- GIN 인덱스 존재 여부 확인
        SELECT EXISTS (
            SELECT 1 
            FROM pg_indexes 
            WHERE tablename = 'page' 
            AND indexname = 'page_fts_gin_idx'
        ) INTO index_exists;
    
        IF NOT index_exists THEN
            -- GIN 인덱스 생성
            EXECUTE 'CREATE INDEX page_fts_gin_idx ON page USING gin(fts)';
        END IF;
    END $$;

    create or replace function hybrid_search(
      query_text text,
      query_embedding vector(512),
      match_count int,
      full_text_weight float = 1,
      semantic_weight float = 1,
      rrf_k int = 50
    )
    returns setof page
    language sql
    as $$
    with full_text as (
      select
        id,
        -- Note: ts_rank_cd is not indexable but will only rank matches of the where clause
        -- which shouldn't be too big
        row_number() over(order by ts_rank_cd(fts, websearch_to_tsquery(query_text)) desc) as rank_ix
      from
        page
      where
        fts @@ websearch_to_tsquery(query_text)
      order by rank_ix
      limit least(match_count, 30) * 2
    ),
    semantic as (
      select
        id,
        row_number() over (order by embedding <#> query_embedding) as rank_ix
      from
        page
      order by rank_ix
      limit least(match_count, 30) * 2
    )
    select
      page.*
    from
      full_text
      full outer join semantic
        on full_text.id = semantic.id
      join page
        on coalesce(full_text.id, semantic.id) = page.id
    order by
      coalesce(1.0 / (rrf_k + full_text.rank_ix), 0.0) * full_text_weight +
      coalesce(1.0 / (rrf_k + semantic.rank_ix), 0.0) * semantic_weight
      desc
    limit
      least(match_count, 30)
    $$;
    
    
`);

    // fts 컬럼 추가 (존재 여부 확인 후 추가)
    await this.dataSource.query(`
  DO $$ 
  BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_attribute 
                   WHERE attrelid = 'page'::regclass 
                   AND attname = 'fts') 
    THEN 
      ALTER TABLE page 
      ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('english', document)) STORED;
    END IF; 
  END $$;
`);
  }

  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(Page, dataSource.createEntityManager());
  }

  async findPagesByWorkspace(workspaceId: number): Promise<Partial<Page>[]> {
    return this.find({
      where: { workspace: { id: workspaceId } },
      select: {
        id: true,
        title: true,
        emoji: true,
      },
    });
  }
}
