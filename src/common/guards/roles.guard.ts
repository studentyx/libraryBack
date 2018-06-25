
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'auth/auth.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';
import { JwtService } from 'common/jwt/jwt.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let payload: JwtPayload = this.jwtService.getPayloadFromToken(request.headers.authorization);
    return payload && roles.indexOf(payload.rol) !== -1;

  }

}

