import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrivingService } from './driving.service';
import { CreateDrivingDto } from './dto/create-driving.dto';
import { UpdateDrivingDto } from './dto/update-driving.dto';

@Controller('driving')
export class DrivingController {
  constructor(private readonly drivingService: DrivingService) {}

  @Post()
  create(@Body() createDrivingDto: CreateDrivingDto) {
    return this.drivingService.create(createDrivingDto);
  }

  @Get()
  findAll() {
    return this.drivingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drivingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrivingDto: UpdateDrivingDto) {
    return this.drivingService.update(+id, updateDrivingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drivingService.remove(+id);
  }
}
