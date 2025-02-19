import { Test, TestingModule } from '@nestjs/testing';
import { ChatAbortController } from './chat-abort.controller';
import { ChatAbortService } from './chat-abort.service';
import { AbortResponseMessage } from './chat-abort.controller';

describe('AbortController', () => {
  let abortController: ChatAbortController;
  let abortService: ChatAbortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatAbortController],
      providers: [ChatAbortService],
    }).compile();

    abortController = module.get<ChatAbortController>(ChatAbortController);
    abortService = module.get<ChatAbortService>(ChatAbortService);
  });

  it('should be defined', () => {
    expect(abortController).toBeDefined();
  });

  it('요청 중단 시 성공 테스트', () => {
    const requestId = 'test-request';
    // AbortService의 abortRequest가 true를 반환하도록 spy 설정
    jest.spyOn(abortService, 'abortRequest').mockReturnValue(true);

    const result = abortController.abort(requestId);

    expect(result).toEqual({
      success: true,
      message: AbortResponseMessage.ABORT_SUCCESS,
    });
  });

  it('존재하지 않는 requestId로 요청 중단 시 실패 테스트', () => {
    const requestId = 'non-existent-request';
    // AbortService의 abortRequest가 false를 반환하도록 spy 설정
    jest.spyOn(abortService, 'abortRequest').mockReturnValue(false);

    const result = abortController.abort(requestId);

    expect(result).toEqual({
      success: false,
      message: AbortResponseMessage.ABORT_FAIL,
    });
  });
});
