import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { EdgeService } from '@app/edge/edge.service';
import { CreateEdgeDto } from '@app/edge/dtos/createEdge.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '@app/edge/dtos/messageResponse.dto';
import { FindEdgesResponseDto } from '@app/edge/dtos/findEdgesResponse.dto';

export enum EdgeResponseMessage {
  EDGES_RETURNED = '워크스페이스의 모든 엣지를 가져왔습니다.',
  EDGE_CREATED = '엣지를 생성했습니다.',
  EDGE_DELETED = '엣지를 삭제했습니다.',
}

@Controller('edge')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @ApiResponse({ type: MessageResponseDto })
  @ApiOperation({ summary: '엣지를 생성합니다.' })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createEdge(@Body() body: CreateEdgeDto) {
    await this.edgeService.createEdge(body);

    return {
      message: EdgeResponseMessage.EDGE_CREATED,
    };
  }

  @ApiResponse({ type: MessageResponseDto })
  @ApiOperation({ summary: '엣지를 삭제합니다.' })
  @Delete('/:fromNode/:toNode') // URL 경로에서 fromNode와 toNode를 추출
  @HttpCode(HttpStatus.OK)
  async deleteEdge(
    @Param('fromNode', ParseIntPipe) fromNode: number,
    @Param('toNode', ParseIntPipe) toNode: number,
  ) {
    await this.edgeService.deleteEdge(fromNode, toNode);

    return {
      message: EdgeResponseMessage.EDGE_DELETED,
    };
  }

  @ApiResponse({
    type: FindEdgesResponseDto,
  })
  @ApiOperation({ summary: '특정 워크스페이스의 모든 엣지들을 가져옵니다.' })
  @Get('/workspace/:workspaceId')
  @HttpCode(HttpStatus.OK)
  async findPagesByWorkspace(
    @Param('workspaceId') workspaceId: string, // Snowflake ID
  ): Promise<FindEdgesResponseDto> {
    const edges = await this.edgeService.findEdgesByWorkspace(workspaceId);

    return {
      message: EdgeResponseMessage.EDGES_RETURNED,
      edges,
    };
  }
}
