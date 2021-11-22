import { PartialType } from '@nestjs/mapped-types';
import { CreateFrontTireDto } from './create-front-tire.dto';

export class UpdateFrontTireDto extends PartialType(CreateFrontTireDto) {}
