import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseInfoDto {
  @ApiProperty({
    description: 'brandId',
    default: 24,
  })
  @IsNumber()
  brandId: number;

  @ApiProperty({
    description: 'brandName',
    default: '기아',
  })
  @IsString()
  brandName: string;

  @ApiProperty({
    description: 'modelName',
    default: '오피러스',
  })
  @IsString()
  modelName: string;

  @ApiProperty({
    description: '자동차 차종 ID (trimId)',
    default: 5000,
  })
  @IsNumber()
  trimId: number;

  @ApiProperty({
    description: 'trimName',
    default: 'GH270 고급형',
  })
  @IsString()
  trimName: string;
}
