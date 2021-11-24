import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: '회원가입 ID',
    default: 'candycandy',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '회원가입 PW',
    default: 'ASdfdsf3232@',
  })
  @IsString()
  password: string;
}
