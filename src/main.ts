import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // entity 의 없는 값을 사전에 차단.
      transform: true, // req 값을 우리가 원하는 실제 타입으로 변경해줌. (e.g. id: string -> number)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cardoc(카닥) x 프리온보딩 개인과제')
    .setDescription('https://github.com/codehousepig')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3017);
}
bootstrap();
