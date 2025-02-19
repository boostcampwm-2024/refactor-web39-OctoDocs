import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class AbortSuccessResponseDto {
  @ApiProperty({
    example: '웹 요청 중단에 성공했습니다.',
    description: '웹 요청 결과 메시지',
  })
  @IsString()
  message: string;
}
