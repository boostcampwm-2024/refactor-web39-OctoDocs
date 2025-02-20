import { Injectable } from '@nestjs/common';
import { EdgeRepository } from './edge.repository';
import { NodeRepository } from '@app/node/node.repository';
import { Edge } from './edge.entity';
import { CreateEdgeDto } from './dtos/createEdge.dto';
import { EdgeNotFoundException } from '@app/exception/edge.exception';
import { WorkspaceRepository } from '@app/workspace/workspace.repository';
import { WorkspaceNotFoundException } from '@app/exception/workspace.exception';

@Injectable()
export class EdgeService {
  constructor(
    private readonly edgeRepository: EdgeRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async createEdge(dto: CreateEdgeDto): Promise<Edge> {
    const { fromNode, toNode } = dto;

    // 출발 노드를 조회한다.
    const existingFromNode = await this.nodeRepository.findOne({
      where: { id: fromNode },
      relations: ['workspace'], // workspace 관계를 포함
    });

    // 도착 노드를 조회한다.
    const existingToNode = await this.nodeRepository.findOneBy({ id: toNode });

    // 엣지를 생성한다.
    return await this.edgeRepository.save({
      fromNode: existingFromNode,
      toNode: existingToNode,
      workspace: existingFromNode.workspace,
    });
  }

  async deleteEdge(fromNode: number, toNode: number): Promise<void> {
    // fromNode와 toNode로 매치되는 엣지를 검색

    // 출발 노드를 조회한다.
    const existingFromNode = await this.nodeRepository.findOneBy({
      id: fromNode,
    });
    // 도착 노드를 조회한다.
    const existingToNode = await this.nodeRepository.findOneBy({ id: toNode });

    const edge = await this.edgeRepository.findOne({
      where: { fromNode: existingFromNode, toNode: existingToNode },
    });

    // 엣지가 없으면 예외를 발생시킴
    if (!edge) {
      throw new EdgeNotFoundException();
    }

    // 엣지를 삭제
    await this.edgeRepository.remove(edge);
  }

  async findEdgesByWorkspace(workspaceId: string): Promise<Edge[]> {
    // 워크스페이스 DB에서 해당 워크스페이스의 내부 id를 찾는다
    const workspace = await this.workspaceRepository.findOneBy({
      snowflakeId: workspaceId,
    });

    if (!workspace) {
      throw new WorkspaceNotFoundException();
    }

    return await this.edgeRepository.findEdgesByWorkspace(workspace.id);
  }
}
