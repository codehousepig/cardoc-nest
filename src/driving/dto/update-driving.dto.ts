import { PartialType } from '@nestjs/mapped-types';
import { CreateDrivingDto } from './create-driving.dto';

export class UpdateDrivingDto extends PartialType(CreateDrivingDto) {}
