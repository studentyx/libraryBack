import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from 'auth/auth.controller';
import { JwtService } from 'common/jwt/jwt.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}

