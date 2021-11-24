import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RearTireService } from './rear-tire.service';
import { CreateRearTireDto } from './dto/create-rear-tire.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('reartire')
export class RearTireController {
  constructor(private readonly rearTireService: RearTireService) {}

  @ApiTags('TIRE')
  @ApiOperation({ summary: 'rearTire 정보 등록' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: '타이어 후 등록 성공' })
  @ApiResponse({ status: 400, description: 'Parameter(id)가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRearTireDto: CreateRearTireDto): Promise<number> {
    return await this.rearTireService.create(createRearTireDto);
  }
}
