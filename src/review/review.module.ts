import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSchema } from './review.schema';
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import { AuthService } from 'auth/auth.service';
import { JwtService } from 'common/jwt/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]), AuthModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, AuthService, JwtService],
})
export class ReviewModule {}

