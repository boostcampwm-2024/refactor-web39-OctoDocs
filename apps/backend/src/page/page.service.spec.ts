import { Test, TestingModule } from '@nestjs/testing';
import { PageService } from './page.service';
import { PageRepository } from './page.repository';
import { NodeRepository } from '../node/node.repository';
import { Page } from './page.entity';
import { Node } from '../node/node.entity';
import { Workspace } from '../workspace/workspace.entity';
import { CreatePageDto } from './dtos/createPage.dto';
import { PageNotFoundException } from '../exception/page.exception';
import { WorkspaceRepository } from '../workspace/workspace.repository';

describe('PageService', () => {
  let service: PageService;
  let pageRepository: PageRepository;
  let nodeRepository: NodeRepository;
  let workspaceRepository: WorkspaceRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PageService,
        {
          provide: PageRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            findPagesByWorkspace: jest.fn(),
          },
        },
        {
          provide: NodeRepository,
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

    service = module.get<PageService>(PageService);
    pageRepository = module.get<PageRepository>(PageRepository);
    nodeRepository = module.get<NodeRepository>(NodeRepository);
    workspaceRepository = module.get<WorkspaceRepository>(WorkspaceRepository);
  });

  it('서비스 클래스가 정상적으로 인스턴스화된다.', () => {
    expect(service).toBeDefined();
    expect(pageRepository).toBeDefined();
    expect(nodeRepository).toBeDefined();
    expect(workspaceRepository).toBeDefined();
  });

  describe('createPage', () => {
    it('페이지를 성공적으로 생성한다.', async () => {
      const newDate1 = new Date();
      const workspace1 = {
        id: 1,
        snowflakeId: 'snowflake-id-1',
        owner: null,
        title: 'workspace1',
        description: null,
        visibility: 'private',
        createdAt: newDate1,
        updatedAt: newDate1,
        thumbnailUrl: null,
        edges: [],
        pages: [],
        nodes: [],
      } as Workspace;

      // 페이지 dto
      const newPageDto: CreatePageDto = {
        title: 'new page',
        content: {} as JSON,
        workspaceId: 'snowflake-id-1',
        x: 1,
        y: 1,
      };

      const newDate2 = new Date();
      // 페이지 엔티티
      const newPage: Page = {
        id: 1,
        title: 'new page',
        content: {} as JSON,
        createdAt: newDate2,
        updatedAt: newDate2,
        version: 1,
        node: null,
        emoji: null,
        workspace: workspace1,
      };

      // 노드 엔티티
      const newNode: Node = {
        id: 1,
        x: 0,
        y: 0,
        color: '#FFFFFF',
        page: null,
        outgoingEdges: [],
        incomingEdges: [],
        workspace: workspace1,
      };

      jest
        .spyOn(workspaceRepository, 'findOneBy')
        .mockResolvedValue(workspace1);

      jest.spyOn(nodeRepository, 'save').mockResolvedValue(newNode);

      jest.spyOn(pageRepository, 'save').mockResolvedValue(newPage);

      const createdPage: Page = await service.createPage(newPageDto);

      expect(createdPage).toEqual(newPage);
      expect(workspaceRepository.findOneBy).toHaveBeenCalledWith({
        snowflakeId: 'snowflake-id-1',
      });
      expect(nodeRepository.save).toHaveBeenCalledWith({
        title: 'new page',
        x: 1,
        y: 1,
        workspace: workspace1,
      });
      expect(pageRepository.save).toHaveBeenCalledWith({
        title: 'new page',
        content: {} as JSON,
        emoji: undefined,
        workspace: workspace1,
        node: newNode,
      });
    });
  });

  describe('deletePage', () => {
    it('id에 해당하는 페이지를 찾아 성공적으로 삭제한다.', async () => {
      jest
        .spyOn(pageRepository, 'delete')
        .mockResolvedValue({ affected: true } as any);
      jest.spyOn(pageRepository, 'findOneBy').mockResolvedValue(new Page());
      await service.deletePage(1);

      expect(pageRepository.delete).toHaveBeenCalledWith(1);
    });

    it('id에 해당하는 페이지가 없을 경우 PageNotFoundException을 throw한다.', async () => {
      jest
        .spyOn(pageRepository, 'delete')
        .mockResolvedValue({ affected: false } as any);
      await expect(service.deletePage(1)).rejects.toThrow(
        PageNotFoundException,
      );
    });
  });

  describe('findPageById', () => {
    it('id에 해당하는 페이지를 찾아 성공적으로 반환한다.', async () => {
      const newDate = new Date();
      const expectedPage: Page = {
        id: 1,
        title: 'title',
        content: {} as JSON,
        node: null,
        createdAt: newDate,
        updatedAt: newDate,
        version: 1,
        emoji: null,
        workspace: null,
      };
      // createQueryBuilder를 모킹
      const createQueryBuilderMock = jest.fn().mockReturnThis();
      const leftJoinAndSelectMock = jest.fn().mockReturnThis();
      const whereMock = jest.fn().mockReturnThis();
      const getOneMock = jest.fn().mockResolvedValue(expectedPage);

      // pageRepository의 메서드 체이닝을 모킹
      pageRepository.createQueryBuilder = createQueryBuilderMock;
      createQueryBuilderMock.mockReturnValueOnce({
        leftJoinAndSelect: leftJoinAndSelectMock,
        where: whereMock,
        getOne: getOneMock,
      });
      await expect(service.findPageById(1)).resolves.toEqual(expectedPage);
    });

    it('id에 해당하는 페이지가 없을 경우 PageNotFoundException을 throw한다.', async () => {
      const createQueryBuilderMock = jest.fn().mockReturnThis();
      const leftJoinAndSelectMock = jest.fn().mockReturnThis();
      const whereMock = jest.fn().mockReturnThis();
      const getOneMock = jest.fn().mockResolvedValue(undefined);

      pageRepository.createQueryBuilder = createQueryBuilderMock;
      createQueryBuilderMock.mockReturnValueOnce({
        leftJoinAndSelect: leftJoinAndSelectMock,
        where: whereMock,
        getOne: getOneMock,
      });
      await expect(service.findPageById(1)).rejects.toThrow(
        PageNotFoundException,
      );
    });
  });
});
