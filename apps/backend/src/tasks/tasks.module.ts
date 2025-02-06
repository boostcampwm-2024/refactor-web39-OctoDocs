import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RedisModule } from '../redis/redis.module';
import { PageModule } from '../page/page.module';
import { LangchainModule } from '../langchain/langchain.module';
import { LangchainService } from '../langchain/langchain.service';

@Module({
  imports: [RedisModule, PageModule, LangchainModule],
  providers: [TasksService, LangchainService],
})
export class TasksModule {}
