import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';
import { UserService } from 'user/user.service';
@Controller(AuthController.URL)
export class AuthController {
    static URL: string = 'auth';
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
    @Post()
    async authenticate( @Body() userDto: UserDto): Promise<any> {
        const exito: boolean = await this.authService.validateUser(userDto.username, userDto.password);
        let token = null;
        if (exito) {
            token = await this.authService.createToken(userDto.username);
        }
        return new Promise((resolve, reject) => {
            resolve({ token });
        });
    }
}



