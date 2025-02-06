import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryRequest {
  @IsString()
  @ApiProperty({
    example: '회의록의 내용을 요약 해 줘',
    description: '사용자의 요청 사항',
  })
  query: string;
}
