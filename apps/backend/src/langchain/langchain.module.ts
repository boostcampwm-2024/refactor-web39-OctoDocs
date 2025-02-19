import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LangchainController } from './langchain.controller';
import { ChatAbortService } from '../abort/chat-abort.service';
import { ChatAbortModule } from '../abort/chat-abort.module';

@Module({
  imports: [ChatAbortModule],
  providers: [LangchainService],
  controllers: [LangchainController],
})
export class LangchainModule {}
