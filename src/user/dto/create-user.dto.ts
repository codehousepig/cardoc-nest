import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
