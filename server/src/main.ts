import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const mode = config.get<string>('MODE');
  const apiPort = config.get<number>('API_PORT');
  const port = mode === 'dev' ? 3001 : apiPort;
  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();
