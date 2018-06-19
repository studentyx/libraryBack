import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './book/book.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { ReviewModule } from 'review/review.module';

const USER_BD = 'library';
const PASSWORD_BD = 'library';
const MONGODB_URI = `mongodb://${USER_BD}:${PASSWORD_BD}@ds123770.mlab.com:23770/library`;

@Module({
  imports: [
      MongooseModule.forRoot(MONGODB_URI),
      BookModule,
      UserModule,
      AuthModule,
      ReviewModule,
  ],
})
export class AppModule {}
