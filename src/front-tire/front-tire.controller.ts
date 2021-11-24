import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FrontTireService } from './front-tire.service';
import { CreateFrontTireDto } from './dto/create-front-tire.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('fronttire')
export class FrontTireController {
  constructor(private readonly frontTireService: FrontTireService) {}

  @ApiTags('TIRE')
  @ApiOperation({ summary: 'frontTire 정보 등록' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '타이어 전 등록 성공' })
  @ApiResponse({ status: 400, description: 'Parameter(id)가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createFrontTireDto: CreateFrontTireDto,
  ): Promise<number> {
    return await this.frontTireService.create(createFrontTireDto);
  }
}
