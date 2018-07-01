import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors = require('cors');
import helmet = require('helmet');
import bodyParser = require('body-parser');
import filter = require('content-filter');
import protect = require('@risingstack/protect');
import Ddos = require( 'ddos' );
import express = require( 'express' );
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(helmet());
  let ddos = new Ddos;
  app.use( ddos.express );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.useGlobalPipes(new ValidationPipe());

  app.use(protect.express.sqlInjection({
    loggerFunction: console.error
  }))

  app.use(protect.express.xss({
    loggerFunction: console.error
  }))

  let blackList = ['$', '{', '&&', '||'];
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