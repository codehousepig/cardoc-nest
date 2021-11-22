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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
    }),
    UserModule,
    AuthModule,
    BaseInfoModule,
    SpecModule,
    DrivingModule,
    FrontTireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
