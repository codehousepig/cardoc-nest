import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @ApiTags('USER')
  @ApiOperation({ summary: '사용자가 소유한 타이어 정보 조회' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '타이어정보 조회 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Get('/user/mytire')
  async myTire(@Request() req) {
    return await this.templateService.myTire(req.user);
  }

  @ApiTags('TRIM')
  @ApiOperation({ summary: '자동차 정보 조회' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @Get('/trim/:id')
  findOne(@Param('id') id: number) {
    return this.templateService.trimToView(id);
  }
}
