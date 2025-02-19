import { LangchainService } from './langchain.service';
import { QueryRequest } from './dtos/queryRequest.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Headers,
  Logger,
} from '@nestjs/common';
import { ChatAbortService } from '../abort/chat-abort.service';
export enum LangchainResponseMessage {
  RESPONSE_RETURNED = 'AI의 응답을 받아왔습니다.',
}

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('langchain')
export class LangchainController {
  constructor(
    private readonly landchainService: LangchainService,
    private readonly abortService: ChatAbortService,
  ) {}
  @ApiOperation({ summary: 'AI에게 요청을 보냅니다.' })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async query(
    @Headers('x-request-id') requestId: string,
    @Body() body: QueryRequest,
    @Res() res,
  ) {
    // request id를 key로 해서 저장
    const abortController = this.abortService.createController(requestId);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Request-Id', requestId);

    res.flushHeaders();
    try {
      const response = await this.landchainService.query(
        body.query,
        abortController,
      );
      for await (const chunk of response) {
        res.write(`${chunk.content}\n\n`);
      }
      res.end();
    } catch (error) {
      Logger.log('error name : ', error.name);
      if (error.name === 'AbortError') {
        Logger.error('LLM API request abort', error.message, error.stack);
      } else {
        // AbortError가 아니면 exceptional handler에서 처리
        throw error;
      }
      // 오류 생기면 바로 종료
      res.end();
    }
    res.on('close', () => {
      res.end();
    });
  }

  // async query(@Body() body: QueryRequest): Promise<Observable<MessageEvent>> {
  //   console.log(body.query);
  //   const response = await this.landchainService.query(body.query);
  //   return from(response).pipe(
  //     map((message) => ({ data: message['content'] })),
  //   );
  // }
}
