import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: config.get<string>('API_ORIGIN_URL'),
    credentials: true,
  });
  app.use(cookieParser());
  const port = process.env.PORT || 3001;
  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();
