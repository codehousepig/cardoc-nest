import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseInfoDto } from './create-baseinfo.dto';

export class UpdateBaseInfoDto extends PartialType(CreateBaseInfoDto) {}
