import { Controller, Get, Param } from '@nestjs/common';
import { AbortService } from './abort.service';

export enum AbortResponseMessage {
  ABORT_SUCCESS = '웹 요청 중단에 성공했습니다.',
  ABORT_FAIL = '웹 요청 중단에 실패했습니다.',
}

@Controller('abort')
export class AbortController {
  constructor(private readonly abortService: AbortService) {}

  @Get('/:requestId')
  abort(@Param('requestId') requestId: string) {
    const success = this.abortService.abortRequest(requestId);
    return {
      success,
      message: success
        ? AbortResponseMessage.ABORT_SUCCESS
        : AbortResponseMessage.ABORT_FAIL,
    };
  }
}
