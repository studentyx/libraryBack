import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';
import { UserService } from 'user/user.service';
import { UserPipe } from 'common/pipes/user.pipe';
@Controller(AuthController.URL)
export class AuthController {
    static URL: string = 'auth';
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }
    @Post()
    async authenticate( @Body(new UserPipe()) userDto: UserDto): Promise<any> {

        let token = await this.authService.loginUser(userDto.username, userDto.password);

        return new Promise((resolve, reject) => {
            resolve({ token });
        });
    }
}



