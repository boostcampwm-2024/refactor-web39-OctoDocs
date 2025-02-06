import { Test, TestingModule } from '@nestjs/testing';
import { LangchainService } from './langchain.service';
import { ConfigService } from '@nestjs/config';

describe('LangchainService', () => {
  let service: LangchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LangchainService,
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LangchainService>(LangchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
