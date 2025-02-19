import { Module } from '@nestjs/common';
import { AbortService } from './abort.service';
import { AbortController } from './abort.controller';

@Module({
  providers: [AbortService],
  controllers: [AbortController],
})
export class LangchainModule {}
