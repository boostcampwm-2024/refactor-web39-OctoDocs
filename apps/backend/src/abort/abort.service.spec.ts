import { Test, TestingModule } from '@nestjs/testing';
import { AbortService } from './abort.service';

describe('AbortService', () => {
  let abortService: AbortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbortService],
    }).compile();

    abortService = module.get<AbortService>(AbortService);
  });

  it('AbortController를 생성하고 저장해야 한다.', () => {
    const requestId = 'test';

    const controller = abortService.createController(requestId);

    expect(controller).toBeDefined(); // AbortController가 생성되었는지 확인
    expect(controller.signal.aborted).toBe(false); // 아직 중단되지 않았는지 확인

    const storedController = abortService.getController(requestId);
    expect(storedController).toBe(controller); // 저장된 컨트롤러가 동일한지 확인
  });

  it('요청을 중단하고 캐시에서 삭제해야 한다.', () => {
    const requestId = 'test';
    const controller = abortService.createController(requestId);

    expect(controller.signal.aborted).toBe(false); // 초기 상태 확인

    const success = abortService.abortRequest(requestId);

    expect(success).toBe(true); // 요청 중단이 성공했는지 확인
    expect(controller.signal.aborted).toBe(true); // AbortController가 중단되었는지 확인
    expect(abortService.getController(requestId)).toBeUndefined(); // 캐시에서 삭제되었는지 확인
  });

  it('존재하지 않는 requestId로 요청 중단 시 false를 반환해야 한다.', () => {
    const success = abortService.abortRequest('non-existent-id');
    expect(success).toBe(false); // 존재하지 않는 요청은 중단할 수 없어야 함
  });
});
