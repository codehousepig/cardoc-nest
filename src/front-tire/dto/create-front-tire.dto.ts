import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFrontTireDto {
  @ApiProperty({
    description: '자동차 차종 ID',
    default: 5002,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'name',
    default: '타이어 전',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '타이어 폭',
    default: 225,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: '편병비',
    default: 60,
  })
  @IsNumber()
  ratio: number;

  @ApiProperty({
    description: '휠사이즈',
    default: 16,
  })
  @IsNumber()
  wheel: number;

  // @IsString()
  // unit: string;
  //
  // @IsString()
  // multiValues: string;
}
