import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecService } from './spec.service';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';
import { Spec } from './entities/spec.entity';

@Controller('spec')
export class SpecController {
  constructor(private readonly specService: SpecService) {}

  @Post()
  async create(@Body() createSpecDto: CreateSpecDto): Promise<number> {
    return await this.specService.create(createSpecDto);
  }

  @Get()
  findAll() {
    return this.specService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Spec> {
    return await this.specService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSpecDto: UpdateSpecDto) {
    return this.specService.update(id, updateSpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.specService.remove(id);
  }
}
