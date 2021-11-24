import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDrivingDto {
  @ApiProperty({
    description: '자동차 차종 ID',
    default: 5002,
  })
  @IsNumber()
  id: number;
}
