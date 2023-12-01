import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Removes values from the request body that don't match the dto
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
