import { Test, TestingModule } from '@nestjs/testing';
import { LangchainController } from './langchain.controller';
import { LangchainService } from './langchain.service';
import { ChatAbortService } from '../abort/chat-abort.service';
describe('LangchainController', () => {
  let controller: LangchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangchainController],
      providers: [
        {
          provide: LangchainService,
          useValue: {
            onModuleInit: jest.fn(),
            query: jest.fn(),
            insertDocuments: jest.fn(),
          },
        },
        {
          provide: ChatAbortService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LangchainController>(LangchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
