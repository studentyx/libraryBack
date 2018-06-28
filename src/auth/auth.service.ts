import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';
import { JwtService } from 'common/jwt/jwt.service';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async loginUser(username: string, password: string): Promise<any> {
        let token: string = null;
        const userDocument: User = await this.userService.findByUsername(username, true);
        if (userDocument) {
            const match = await bcrypt.compare(password, userDocument.password);
            if (userDocument.username === username && match) {
                token = await this.jwtService.createToken(userDocument);
            }
        }
        return token;
    }
}

