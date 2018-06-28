import { Controller, Get, Post, Body, Param, UseGuards, Headers, HttpStatus, HttpException, Patch } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.interface';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

import request = require('supertest');
import { JwtService } from 'common/jwt/jwt.service';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';

@Controller(UserController.URL)
@UseGuards(RolesGuard)
export class UserController {
    static URL: string = 'users';
    static USERNAME: string = ':username';

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    @Post()
    async create(@Headers() headers, @Body() userDto: UserDto ): Promise<User> {
        let recaptchaSecretKey: string = '6Lc4AGAUAAAAAGRuqNtoOV1QPZ48PaGwofl9Tizw';
        let recaptchaUrl =  "https://www.google.com/recaptcha/api/siteverify?secret=" 
        + recaptchaSecretKey
        + "&response=" 
        + headers.recaptcha;

        const peticion = request.agent(recaptchaUrl);
        peticion.post('')
        .end((err, res) => {
            if ( res.body.success === true ){
                return this.userService.create(userDto);
            }
        });
        return null;
    }

    @Get(UserController.USERNAME)
    async findOne(@Param() param): Promise<User> {
        return this.userService.findByUsername(param.username, false);
    }

    @Patch(UserController.USERNAME)
    @Roles('visitor', 'bookManager', 'admin')
    async updateUser(@Headers() headers, @Param() param, @Body() userDto: UserDto): Promise<User> {
        const token: string = headers.authorization;
        const payload: JwtPayload = await this.jwtService.getPayloadFromToken(token);
        let user: User = null;

        if ( payload.rol !== 'admin' && payload.username !== param.username ){
            throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
        }else{
            user = await this.userService.updateUser(token, param.username, userDto);
            if ( user === null ){
                throw new HttpException('Not found', HttpStatus.NOT_FOUND);
            }
        }
        return user;
    }

}