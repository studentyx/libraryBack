
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'auth/auth.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let payload: JwtPayload = this.getPayloadFromToken(request.headers.authorization);

    return payload && roles.indexOf(payload.rol) !== -1;

  }

  getPayloadFromToken(token: string): JwtPayload {
    let payload: JwtPayload = null;
    jwt.verify(token, 'libraryProject', (err, decoded) => {
      if (!err) {
        payload = jwt.decode(token, 'libraryProject');
      } else {
        console.log('Error a la hora de verificar el token en "auth.service.ts".');
      }
    });
    return payload;
  }



}

