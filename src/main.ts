import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

// const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 환경 변수에서 포트 가져오기
  const port = process.env.APP_PORT;
  console.log(`Server is running on port ${port}`)
  await app.listen(port);
}
bootstrap();
