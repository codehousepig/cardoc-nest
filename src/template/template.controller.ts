import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}
  @UseGuards(JwtAuthGuard)
  @Get('mytire')
  async myTire(@Request() req) {
    return await this.templateService.myTire(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.templateService.trimToView(id);
  }
}
