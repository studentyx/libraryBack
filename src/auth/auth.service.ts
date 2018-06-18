import * as jwt from 'jsonwebtoken';
import {Component, forwardRef, Inject} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';

@Component()
export class AuthService {
    static secret = 'libraryProject';

    constructor(private readonly userService: UserService) {}

    async createToken(username: string): Promise<any>  {
        const expiresIn = 60 * 30; // 30min
        let payload = { sub: username }; // NO PONER CONST
        const token = jwt.sign(payload, AuthService.secret, { expiresIn });
        return token;
    }

    async validateUser(username: string, password: string): Promise<boolean> {
        const userDocument: User = await this.userService.findByUsername(username);

        if (userDocument) {
            const match = await bcrypt.compare(password, userDocument.password );
            return userDocument.username === username && match;
        } else {
            return false;
        }
    }

    async getUserValidatedFromToken(token: string): Promise<string> {
        let user: string = null;
        jwt.verify(token, AuthService.secret, (err, decoded) => {
            if (!err) {
                const payload = jwt.decode(token, AuthService.secret);
                user = payload.sub;
            } else {
                console.log('Error a la hora de verificar el token en "auth.service.ts".');
            }
        });
        return user;
    }

}