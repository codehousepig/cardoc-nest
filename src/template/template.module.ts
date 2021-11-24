import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { FrontTireService } from '../front-tire/front-tire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driving } from '../driving/entities/driving.entity';
import { FrontTire } from '../front-tire/entities/front-tire.entity';
import { BaseInfo } from '../baseinfo/entities/baseinfo.entity';
import { BaseInfoService } from '../baseinfo/baseinfo.service';
import { RearTire } from '../rear-tire/entities/rear-tire.entity';
import { RearTireService } from '../rear-tire/rear-tire.service';

@Module({
  imports: [TypeOrmModule.forFeature([FrontTire, RearTire, Driving, BaseInfo])],
  exports: [TemplateService],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    FrontTireService,
    RearTireService,
    BaseInfoService,
  ],
})
export class TemplateModule {}
