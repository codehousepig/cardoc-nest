import { Controller, Get, Param } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.templateService.trimToView(id);
  }
}
