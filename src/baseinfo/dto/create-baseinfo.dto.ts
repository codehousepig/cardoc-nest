import { IsNumber, IsString } from 'class-validator';

export class CreateBaseInfoDto {
  @IsNumber()
  brandId: number;

  @IsString()
  brandName: string;

  @IsString()
  modelName: string;

  @IsNumber()
  trimId: number;

  @IsString()
  trimName: string;
}
