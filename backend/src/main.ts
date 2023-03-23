import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  await new Promise((res) => {
    setTimeout(() => res(null), 10000);
  });
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors();
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
