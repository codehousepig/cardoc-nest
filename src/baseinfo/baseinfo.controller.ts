import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseInfoService } from './baseinfo.service';
import { CreateBaseInfoDto } from './dto/create-baseinfo.dto';
import { UpdateBaseInfoDto } from './dto/update-baseinfo.dto';

@Controller('trim') //
export class BaseInfoController {
  constructor(private readonly baseInfoService: BaseInfoService) {}

  @Post()
  async create(@Body() createBaseInfoDto: CreateBaseInfoDto): Promise<number> {
    return await this.baseInfoService.create(createBaseInfoDto);
  }

  @Get()
  findAll() {
    return this.baseInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.baseInfoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBaseInfoDto: UpdateBaseInfoDto,
  ) {
    return this.baseInfoService.update(id, updateBaseInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.baseInfoService.remove(id);
  }
}
