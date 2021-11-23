import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RearTireService } from './rear-tire.service';
import { CreateRearTireDto } from './dto/create-rear-tire.dto';
import { UpdateRearTireDto } from './dto/update-rear-tire.dto';

@Controller('reartire')
export class RearTireController {
  constructor(private readonly rearTireService: RearTireService) {}

  @Post()
  async create(@Body() createRearTireDto: CreateRearTireDto): Promise<number> {
    return await this.rearTireService.create(createRearTireDto);
  }

  @Get()
  findAll() {
    return this.rearTireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rearTireService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRearTireDto: UpdateRearTireDto,
  ) {
    return this.rearTireService.update(+id, updateRearTireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rearTireService.remove(+id);
  }
}
