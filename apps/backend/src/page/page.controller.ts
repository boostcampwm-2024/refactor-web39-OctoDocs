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
import { PageService } from '@app/page/page.service';
import { CreatePageDto } from '@app/page/dtos/createPage.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '@app/page/dtos/messageResponse.dto';
import { FindPageResponseDto } from '@app/page/dtos/findPageResponse.dto';
import { CreatePageResponseDto } from '@app/page/dtos/createPageResponse.dto';

export enum PageResponseMessage {
  PAGE_CREATED = '페이지와 노드를 생성했습니다.',
  PAGE_DELETED = '페이지와 노드를 삭제했습니다.',
  PAGE_RETURNED = '페이지를 가져왔습니다.',
}

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiResponse({
    type: CreatePageResponseDto,
  })
  @ApiOperation({ summary: '페이지를 생성하고 노드도 생성합니다.' })
  @ApiBody({
    description: 'post',
    type: CreatePageDto,
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createPage(
    @Body() body: CreatePageDto,
  ): Promise<CreatePageResponseDto> {
    const newPage = await this.pageService.createPage(body);

    return {
      message: PageResponseMessage.PAGE_CREATED,
      pageId: newPage.id,
    };
  }

  @ApiResponse({
    type: MessageResponseDto,
  })
  @ApiOperation({
    summary: '페이지를 삭제하고 노드도 삭제합니다. (cascade delete)',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deletePage(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResponseDto> {
    await this.pageService.deletePage(id);

    return {
      message: PageResponseMessage.PAGE_DELETED,
    };
  }

  @ApiResponse({
    type: FindPageResponseDto,
  })
  @ApiOperation({ summary: '특정 페이지를 가져옵니다.' })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findPage(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindPageResponseDto> {
    return {
      message: PageResponseMessage.PAGE_RETURNED,
      page: await this.pageService.findPageById(id),
    };
  }
}
