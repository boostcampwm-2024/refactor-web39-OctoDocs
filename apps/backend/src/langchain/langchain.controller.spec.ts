import { Test, TestingModule } from '@nestjs/testing';
import { LangchainController } from './langchain.controller';

describe('LangchainController', () => {
  let controller: LangchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangchainController],
    }).compile();

    controller = module.get<LangchainController>(LangchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
