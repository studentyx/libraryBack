import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`___________ Run server in localhost:${PORT} ___________`);
  });
}
bootstrap();




