import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // entity 의 없는 값을 사전에 차단.
      transform: true, // req 값을 우리가 원하는 실제 타입으로 변경해줌. (e.g. id: string -> number)
    }),
  );
  await app.listen(3000);
}
bootstrap();
