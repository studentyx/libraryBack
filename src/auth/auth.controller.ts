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

        let token = await this.authService.loginUser(userDto.username, userDto.password);

        return new Promise((resolve, reject) => {
            resolve({ token });
        });
    }
}



