import { IsNumber, IsString } from 'class-validator';

export class CreateFrontTireDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  width: number;

  @IsNumber()
  ratio: number;

  @IsNumber()
  wheel: number;

  // @IsString()
  // unit: string;
  //
  // @IsString()
  // multiValues: string;
}
