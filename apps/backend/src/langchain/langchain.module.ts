import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LangchainController } from './langchain.controller';

@Module({
  providers: [LangchainService],
  controllers: [LangchainController],
})
export class LangchainModule {}
