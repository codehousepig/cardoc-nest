import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { BaseInfoModule } from './baseinfo/baseinfo.module';
import { SpecModule } from './spec/spec.module';
import { DrivingModule } from './driving/driving.module';
import { FrontTireModule } from './front-tire/front-tire.module';
import { TemplateModule } from './template/template.module';
import { RearTireModule } from './rear-tire/rear-tire.module';
import { User } from './user/entities/user.entity';
import { BaseInfo } from './baseinfo/entities/baseinfo.entity';
import { Spec } from './spec/entities/spec.entity';
import { Driving } from './driving/entities/driving.entity';
import { FrontTire } from './front-tire/entities/front-tire.entity';
import { RearTire } from './rear-tire/entities/rear-tire.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
    }),
    TypeOrmModule.forFeature([
      User,
      BaseInfo,
      Spec,
      Driving,
      FrontTire,
      RearTire,
    ]),
    UserModule,
    AuthModule,
    BaseInfoModule,
    SpecModule,
    DrivingModule,
    FrontTireModule,
    TemplateModule,
    RearTireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
