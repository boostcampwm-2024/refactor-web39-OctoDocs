import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Page } from './page.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PageRepository extends Repository<Page> implements OnModuleInit {
  async onModuleInit() {
    await this.dataSource.query(`
      ALTER TABLE page ADD COLUMN embedding vector(384);
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
