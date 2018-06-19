import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'auth/JwtPayload.interface';

@Injectable()
export class AuthService {
    static secret = 'libraryProject';

    constructor(private readonly userService: UserService) {}

    async loginUser(username: string, password: string): Promise<boolean> {
        const userDocument: User = await this.userService.findByUsername(username);

        if (userDocument) {
            const match = await bcrypt.compare(password, userDocument.password );
            return userDocument.username === username && match;
        } else {
            return false;
        }
    }

    async createToken(username: string): Promise<any>  {
        const expiresIn = 60 * 30; // 30min
        let payload: JwtPayload = { username: username }; 
        const token = jwt.sign(payload, AuthService.secret, { expiresIn });
        return token;
    }

    async validateUser(payload: JwtPayload): Promise<boolean> {
        const userDocument: User = await this.userService.findByUsername(payload.username);

        if (userDocument) {
            return true;
        } else {
            return false;
        }
    }

    async getUserValidatedFromToken(token: string): Promise<string> {
        let username: string = null;
        jwt.verify(token, AuthService.secret, (err, decoded) => {
            if (!err) {
                let payload: JwtPayload = jwt.decode(token, AuthService.secret);
                username = payload.username;
            } else {
                console.log('Error a la hora de verificar el token en "auth.service.ts".');
            }
        });
        return username;
    }

}

