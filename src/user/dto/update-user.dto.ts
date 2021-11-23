import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User ID',
    default: 'candycandy',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '변경할 PW',
    default: 'TestPassword',
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: '차종 ID',
    type: Number,
    default: 5000,
  })
  @IsNumber()
  trimId?: number;
}
