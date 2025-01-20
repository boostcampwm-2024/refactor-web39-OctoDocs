import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEdgeDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '출발 노드의 ID',
  })
  fromNode: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '도착 노드의 ID',
  })
  toNode: number;

  @ApiProperty({
    example: 'snowflake-id-example',
    description: '엣지가 만들어지는 워크스페이스의 (외부) id입니다.',
  })
  @IsString()
  @IsNotEmpty()
  workspaceId: string; // Snowflake ID
}
