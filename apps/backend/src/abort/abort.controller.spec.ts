import { Test, TestingModule } from '@nestjs/testing';
import { AbortController } from './abort.controller';
import { AbortService } from './abort.service';
import { AbortResponseMessage } from './abort.controller';

describe('AbortController', () => {
  let abortController: AbortController;
  let abortService: AbortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbortController],
      providers: [AbortService],
    }).compile();

    abortController = module.get<AbortController>(AbortController);
    abortService = module.get<AbortService>(AbortService);
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
