import { Module } from '@nestjs/common';
import { DrivingService } from './driving.service';
import { DrivingController } from './driving.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driving } from './entities/driving.entity';
import { Spec } from '../spec/entities/spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driving, Spec])],
  exports: [DrivingService],
  controllers: [DrivingController],
  providers: [DrivingService],
})
export class DrivingModule {}
