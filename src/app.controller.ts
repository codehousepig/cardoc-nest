import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('USER')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: 'Parameter가 잘못되었습니다.' })
  @ApiResponse({ status: 401, description: '인증을 위한 Header가 잘못됨' })
  @ApiResponse({ status: 500, description: '기타 서버 에러' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
