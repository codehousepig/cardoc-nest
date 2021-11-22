import { Module } from '@nestjs/common';
import { SpecService } from './spec.service';
import { SpecController } from './spec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spec } from './entities/spec.entity';
import { BaseInfo } from '../baseinfo/entities/baseinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spec, BaseInfo])],
  exports: [SpecService],
  controllers: [SpecController],
  providers: [SpecService],
})
export class SpecModule {}
