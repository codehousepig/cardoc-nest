import { Module } from '@nestjs/common';
import { RearTireService } from './rear-tire.service';
import { RearTireController } from './rear-tire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RearTire } from './entities/rear-tire.entity';
import { Driving } from '../driving/entities/driving.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RearTire, Driving])],
  exports: [RearTireService],
  controllers: [RearTireController],
  providers: [RearTireService],
})
export class RearTireModule {}
