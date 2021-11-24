import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DrivingService } from './driving.service';
import { CreateDrivingDto } from './dto/create-driving.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('driving')
export class DrivingController {
  constructor(private readonly drivingService: DrivingService) {}

  @ApiTags('DRIVING')
  @ApiOperation({ summary: 'driving 정보 등록' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'driving 등록 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDrivingDto: CreateDrivingDto) {
    return this.drivingService.create(createDrivingDto);
  }
}
