import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SpecService } from './spec.service';
import { CreateSpecDto } from './dto/create-spec.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('spec')
export class SpecController {
  constructor(private readonly specService: SpecService) {}

  @ApiTags('SPEC')
  @ApiOperation({ summary: 'spec 정보 등록' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'spec 등록 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSpecDto: CreateSpecDto): Promise<number> {
    return await this.specService.create(createSpecDto);
  }
}
