import { PartialType } from '@nestjs/swagger';
import { CreateRearTireDto } from './create-rear-tire.dto';

export class UpdateRearTireDto extends PartialType(CreateRearTireDto) {}
