import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrontTireService } from './front-tire.service';
import { CreateFrontTireDto } from './dto/create-front-tire.dto';
import { UpdateFrontTireDto } from './dto/update-front-tire.dto';

@Controller('fronttire')
export class FrontTireController {
  constructor(private readonly frontTireService: FrontTireService) {}

  @Post()
  async create(
    @Body() createFrontTireDto: CreateFrontTireDto,
  ): Promise<number> {
    return await this.frontTireService.create(createFrontTireDto);
  }

  @Get()
  findAll() {
    return this.frontTireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frontTireService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrontTireDto: UpdateFrontTireDto,
  ) {
    return this.frontTireService.update(+id, updateFrontTireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frontTireService.remove(+id);
  }
}
