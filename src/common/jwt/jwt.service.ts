
import { Injectable } from '@nestjs/common';
import { User } from 'user/user.interface';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {

    static secret = 'libraryProject';

    async createToken(user: User): Promise<any> {
        const expiresIn = 60 * 30; // 30min
        let payload: JwtPayload = { username: user.username, rol: user.rol };
        const token = jwt.sign(payload, JwtService.secret, { expiresIn });
        return token;
    }

    getPayloadFromToken(token: string): JwtPayload {

        let payload: JwtPayload = null;
        jwt.verify(token, JwtService.secret, (err, decoded) => {
            if (!err) {
                payload = jwt.decode(token, JwtService.secret);
            } else {
                console.log('Error a la hora de verificar el token en "auth.service.ts".');
            }
        });
        return payload;
    }


}