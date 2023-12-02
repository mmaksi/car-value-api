import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['secretencryptionkey'],
      maxAge: 30 * 1000,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      // Removes values from the request body that don't match the dto
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
