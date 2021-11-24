import { Module } from '@nestjs/common';
import { FrontTireService } from './front-tire.service';
import { FrontTireController } from './front-tire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontTire } from './entities/front-tire.entity';
import { Driving } from '../driving/entities/driving.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FrontTire, Driving])],
  exports: [FrontTireService],
  controllers: [FrontTireController],
  providers: [FrontTireService],
})
export class FrontTireModule {}
