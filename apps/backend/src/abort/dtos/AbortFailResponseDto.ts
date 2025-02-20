import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AbortFailResponseDto {
  @ApiProperty({
    example: '웹 요청 중단에 실패했습니다.',
    description: '웹 요청 결과 메시지',
  })
  @IsString()
  message: string;
}
