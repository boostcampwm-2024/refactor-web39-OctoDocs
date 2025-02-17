import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { NodeService } from '@app/node/node.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindNodesResponseDto } from '@app/node/dtos/findNodesResponse.dto.';

export enum NodeResponseMessage {
  NODES_RETURNED = '워크스페이스의 모든 노드를 가져왔습니다.',
}

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @ApiResponse({
    type: FindNodesResponseDto,
  })
  @ApiOperation({ summary: '특정 워크스페이스의 모든 노드들을 가져옵니다.' })
  @Get('/workspace/:workspaceId')
  @HttpCode(HttpStatus.OK)
  async findNodesByWorkspace(
    @Param('workspaceId') workspaceId: string, // Snowflake ID
  ): Promise<FindNodesResponseDto> {
    const nodes = await this.nodeService.findNodesByWorkspace(workspaceId);

    return {
      message: NodeResponseMessage.NODES_RETURNED,
      nodes,
    };
  }
}
