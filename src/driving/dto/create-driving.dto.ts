import { IsNumber } from 'class-validator';

export class CreateDrivingDto {
  @IsNumber()
  id: number;
}
