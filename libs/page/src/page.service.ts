import { Injectable } from '@nestjs/common';
import { NodeRepository } from '@app/node/node.repository';
import { WorkspaceRepository } from '@app/workspace/workspace.repository';
import { PageRepository } from './page.repository';
import { Page } from './page.entity';
import { CreatePageDto } from './dtos/createPage.dto';
import { PageNotFoundException } from '@app/exception/page.exception';
import { WorkspaceNotFoundException } from '@app/exception/workspace.exception';

@Injectable()
export class PageService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}
  /**
   * redis에 저장된 페이지 정보를 다음 과정을 통해 주기적으로 데이터베이스에 반영한다.
   *
   * 1. redis에서 해당 페이지의 title과 content를 가져온다.
   * 2. 데이터베이스에 해당 페이지의 title과 content를 갱신한다.
   * 3. redis에서 해당 페이지 정보를 삭제한다.
   */
  async createPage(dto: CreatePageDto): Promise<Page> {
    const { title, content, workspaceId, x, y, emoji } = dto;
    // 워크스페이스 DB에서 해당 워크스페이스의 내부 id를 찾는다
    const workspace = await this.workspaceRepository.findOneBy({
      snowflakeId: workspaceId,
    });
    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    // 노드부터 생성한다.
    const node = await this.nodeRepository.save({ title, x, y, workspace });

    // 페이지를 생성한다.
    const page = await this.pageRepository.save({
      title,
      content,
      emoji,
      workspace,
      node,
    });

    // 페이지와 노드를 서로 연결하여 저장한다.
    node.page = page;
    await this.nodeRepository.save(node);
    return page;
  }

  async deletePage(id: number): Promise<void> {
    // 페이지를 삭제한다.
    const deleteResult = await this.pageRepository.delete(id);

    // 만약 삭제된 페이지가 없으면 페이지를 찾지 못한 것
    if (!deleteResult.affected) {
      throw new PageNotFoundException();
    }
  }

  async findPageById(id: number): Promise<Page> {
    // 페이지를 조회한다.

    const page = await this.pageRepository
      .createQueryBuilder('page')
      .leftJoinAndSelect('page.node', 'node')
      .where({ id })
      .getOne();

    // 페이지가 없으면 NotFound 에러
    if (!page) {
      throw new PageNotFoundException();
    }
    return page;
  }
}
