import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors = require('cors');
import helmet = require( 'helmet' );
import bodyParser = require( 'body-parser');
import filter = require( 'content-filter' );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(helmet());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  let blackList = ['$','{','&&','||'];
  let options = {
      urlBlackList: blackList,
      bodyBlackList: blackList
  }
  app.use(filter(options));

  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`___________ Run server in localhost:${PORT} ___________`);
  });
}
bootstrap();




