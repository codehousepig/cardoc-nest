import { IsNumber } from 'class-validator';

export class CreateSpecDto {
  @IsNumber()
  id: number;
}
