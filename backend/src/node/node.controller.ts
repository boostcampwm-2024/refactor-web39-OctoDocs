import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dtos/createNode.dto';
import { UpdateNodeDto } from './dtos/updateNode.dto';
import { MoveNodeDto } from './dtos/moveNode.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from './dtos/messageResponse.dto';
import { CoordinateResponseDto } from './dtos/coordinateResponse.dto';


export enum NodeResponseMessage {
  NODE_CREATED = '노드와 페이지를 생성했습니다.',
  NODE_UPDATED = '노드와 페이지를 갱신했습니다.',
  NODE_DELETED = '노드와 페이지를 삭제했습니다.',
  NODE_GET_COORDINAE = '노드의 현재 좌표를 가져왔습니다.',
  NODE_MOVED = '노드의 위치를 이동했습니다.',
}

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @ApiResponse({
    type: MessageResponseDto,
  })
  @ApiOperation({ summary: '노드를 생성하면서 페이지도 함께 생성합니다.' })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createNode(@Body() body: CreateNodeDto) {
    await this.nodeService.createNode(body);
    return {
      message: NodeResponseMessage.NODE_CREATED,
    };
  }
  @ApiResponse({
    type: MessageResponseDto,
  })
  @ApiOperation({
    summary: '노드를 삭제하면서 페이지도 삭제합니다. (delete: cascade)',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteNode(@Param('id') id: number): Promise<{ message: string }> {
    await this.nodeService.deleteNode(id);
    return {
      message: NodeResponseMessage.NODE_DELETED,
    };
  }
  @ApiResponse({
    type: MessageResponseDto,
  })
  @ApiOperation({ summary: '노드의 제목, 좌표를 수정합니다.' })
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateNode(
    @Param('id') id: number,
    @Body() body: UpdateNodeDto,
  ): Promise<{ message: string }> {
    await this.nodeService.updateNode(id, body);
    return {
      message: NodeResponseMessage.NODE_UPDATED,
    };
  }
  @ApiResponse({
    type: CoordinateResponseDto,
  })
  @ApiOperation({ summary: '노드의 좌표를 가져옵니다.' })
  @Get(':id/coordinates')
  @HttpCode(HttpStatus.OK)
  async getCoordinates(@Param('id', ParseIntPipe) id: number) {
    const coordinate = await this.nodeService.getCoordinates(id);
    return {
      message: NodeResponseMessage.NODE_GET_COORDINAE,
      coordinate: coordinate,
    };
  }

  @Patch('/:id/move')
  @HttpCode(HttpStatus.OK)
  async moveNode(@Param('id') id: number, @Body() body: MoveNodeDto) {
    await this.nodeService.moveNode(id, body);
    return {
      message: NodeResponseMessage.NODE_MOVED,
    };
  }
}
