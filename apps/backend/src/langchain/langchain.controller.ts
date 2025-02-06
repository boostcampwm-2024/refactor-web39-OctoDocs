import { LangchainService } from './langchain.service';
import { QueryRequest } from './dtos/queryRequest.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
export enum LangchainResponseMessage {
  RESPONSE_RETURNED = 'AI의 응답을 받아왔습니다.',
}
@Controller('langchain')
export class LangchainController {
  constructor(private readonly landchainService: LangchainService) {}
  @ApiResponse({ type: QueryRequest })
  @ApiOperation({ summary: 'AI에게 요청을 보냅니다.' })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async query(@Body() body: QueryRequest) {
    const response = await this.landchainService.query(body.query);
    return {
      message: LangchainResponseMessage.RESPONSE_RETURNED,
      response,
    };
  }
}
