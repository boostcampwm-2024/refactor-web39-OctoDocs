import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LangchainController } from './langchain.controller';
import { ChatAbortService } from '../abort/chat-abort.service';

@Module({
  providers: [LangchainService, ChatAbortService],
  controllers: [LangchainController],
})
export class LangchainModule {}
