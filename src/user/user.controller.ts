import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('USER')
  @ApiOperation({ summary: '회원가입: 사용자 생성' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: 'Parameter(id)가 잘못되었습니다.' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return await this.userService.create(createUserDto);
  }

  @ApiTags('USER')
  @ApiOperation({ summary: '회원정보 조회' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '회원정보 조회 성공' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req): Promise<User> {
    const id = req.user.userId;
    return await this.userService.findOne(id);
  }

  @ApiTags('USER')
  @ApiOperation({
    summary: '사용자가 소유한 타이어 정보를 저장 & password update',
  })
  @ApiBearerAuth()
  @ApiBody({ type: [UpdateUserDto] })
  @ApiResponse({ status: 200, description: '회원정보 업데이트 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDTOs: UpdateUserDto[]): Promise<string> {
    return await this.userService.update(updateUserDTOs);
  }

  @ApiTags('USER')
  @ApiOperation({ summary: '회원정보 삭제' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '회원탈퇴 성공' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Request() req): Promise<string> {
    const id = req.user.userId;
    return await this.userService.remove(id);
  }
}
