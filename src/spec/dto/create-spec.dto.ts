import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecDto {
  @ApiProperty({
    description: '자동차 차종 ID',
    default: 5000,
  })
  @IsNumber()
  id: number;
}
