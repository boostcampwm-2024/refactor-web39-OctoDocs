import { Module } from '@nestjs/common';
import { ChatAbortService } from './chat-abort.service';
import { ChatAbortController } from './chat-abort.controller';

@Module({
  providers: [ChatAbortService],
  controllers: [ChatAbortController],
  exports: [ChatAbortService],
})
export class ChatAbortModule {}
