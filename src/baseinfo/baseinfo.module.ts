import { Module } from '@nestjs/common';
import { BaseInfoService } from './baseinfo.service';
import { BaseInfoController } from './baseinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseInfo } from './entities/baseinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseInfo])],
  exports: [BaseInfoService],
  controllers: [BaseInfoController],
  providers: [BaseInfoService],
})
export class BaseInfoModule {}
