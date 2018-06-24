import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';

@Injectable()
export class AuthService {

    static secret = 'libraryProject';

    constructor(private readonly userService: UserService) { }

    async loginUser(username: string, password: string): Promise<any> {
        let token: null;

        const userDocument: User = await this.userService.findByUsername(username, true);
        if (userDocument) {
            const match = await bcrypt.compare(password, userDocument.password);
            if (userDocument.username === username && match) {
                token = await this.createToken(userDocument);
            }
        }

        return token;
    }

    async createToken(user: User): Promise<any> {
        const expiresIn = 60 * 30; // 30min
        let payload: JwtPayload = { username: user.username, rol: user.rol };
        const token = jwt.sign(payload, AuthService.secret, { expiresIn });
        return token;
    }

    getPayloadFromToken(token: string): JwtPayload {
        let payload: JwtPayload = null;
        jwt.verify(token, AuthService.secret, (err, decoded) => {
            if (!err) {
                payload = jwt.decode(token, AuthService.secret);
            } else {
                console.log('Error a la hora de verificar el token en "auth.service.ts".');
            }
        });
        return payload;
    }

}

