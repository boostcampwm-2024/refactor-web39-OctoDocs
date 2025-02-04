import { Injectable } from '@nestjs/common';
import { NodeRepository } from './node.repository';
import { Node } from './node.entity';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { WorkspaceNotFoundException } from '../exception/workspace.exception';

@Injectable()
export class NodeService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async findNodesByWorkspace(workspaceId: string): Promise<Node[]> {
    // 워크스페이스 DB에서 해당 워크스페이스의 내부 id를 찾는다
    const workspace = await this.workspaceRepository.findOneBy({
      snowflakeId: workspaceId,
    });

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    return await this.nodeRepository.findNodesByWorkspace(workspace.id);
  }
}
