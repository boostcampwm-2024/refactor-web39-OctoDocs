import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  PGVectorStore,
  DistanceStrategy,
} from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PoolConfig } from 'pg';
import type { Document } from '@langchain/core/documents';
import { v4 as uuidv4 } from 'uuid';

type DocumentInfo = {
  id: number;
  content: string;
};
// Embeddings 초기화
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

@Injectable()
export class LangchainService implements OnModuleInit {
  private vectorStore: PGVectorStore;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const postgresConfig = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
    } as PoolConfig;

    // 벡터스토어 설정
    const config = {
      postgresConnectionOptions: postgresConfig,
      tableName: 'document',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'vector',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
      },
      distanceStrategy: 'cosine' as DistanceStrategy,
    };

    // PGVectorStore 초기화
    this.vectorStore = await PGVectorStore.initialize(embeddings, config);
  }

  async insertDocuments(documentInfos: DocumentInfo[]) {
    const documents: Document[] = documentInfos.map((document) => {
      return {
        pageContent: document.content,
        metadata: { id: document.id },
      };
    });
    const ids = Array(documents.length).fill(uuidv4());
    await this.vectorStore.addDocuments(documents, { ids: ids });
  }
}
