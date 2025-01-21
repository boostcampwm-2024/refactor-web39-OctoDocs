import { Test, TestingModule } from '@nestjs/testing';
import { NodeService } from './node.service';
import { NodeRepository } from './node.repository';
import { PageRepository } from '../page/page.repository';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { Workspace } from '../workspace/workspace.entity';

describe('NodeService', () => {
  let service: NodeService;
  let nodeRepository: jest.Mocked<NodeRepository>;
  let pageRepository: jest.Mocked<PageRepository>;
  let workspaceRepository: jest.Mocked<WorkspaceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeService,
        {
          provide: NodeRepository,
          useValue: {
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            findNodesByWorkspace: jest.fn(),
          },
        },
        {
          provide: PageRepository,
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: WorkspaceRepository,
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NodeService>(NodeService);
    nodeRepository = module.get(NodeRepository);
    pageRepository = module.get(PageRepository);
    workspaceRepository = module.get(WorkspaceRepository);
  });

  it('서비스 클래스가 정상적으로 인스턴스화된다.', () => {
    expect(service).toBeDefined();
    expect(nodeRepository).toBeDefined();
    expect(pageRepository).toBeDefined();
    expect(workspaceRepository).toBeDefined();
  });

  describe('findNodesByWorkspace', () => {
    it('workspace에 해당하는 노드 조회 성공', async () => {
      const currentDate = new Date();
      const workspace = {
        id: 1,
        snowflakeId: '1234567890',
        title: 'workspace',
        description: 'workspace description',
        visibility: 'private',
        createdAt: currentDate,
        updatedAt: currentDate,
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
      } as Workspace;

      jest.spyOn(workspaceRepository, 'findOneBy').mockResolvedValue(workspace);
      await service.findNodesByWorkspace(workspace.snowflakeId);

      expect(nodeRepository.findNodesByWorkspace).toHaveBeenCalledWith(
        workspace.id,
      );
    });
  });
});
