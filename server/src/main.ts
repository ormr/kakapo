import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const mode = config.get<string>('MODE');
  const apiPort = config.get<number>('API_PORT');
  const port = mode === 'dev' ? 3001 : apiPort;
  await app.listen(port, () => {
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();
