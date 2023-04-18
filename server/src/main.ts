import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get<string>('API_ORIGIN_URL'),
    credentials: true,
  });
  app.use(cookieParser());
  const mode = config.get<string>('MODE');
  const apiPort = config.get<number>('API_PORT');
  const port = mode === 'dev' ? 3001 : apiPort;
  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();
