import { Controller, Get, Post, Body, Param, Put, UseGuards, Headers } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.interface';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

import request = require('supertest');

@Controller(UserController.URL)
@UseGuards(RolesGuard)
export class UserController {
    static URL: string = 'users';
    static USERNAME: string = ':username';

    constructor(private readonly userService: UserService) {}

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

    @Get()
    @Roles('admin')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(UserController.USERNAME)
    async findOne(@Param() param): Promise<User> {
        return this.userService.findByUsername(param.username);
    }

    @Put(UserController.USERNAME)
    @Roles('visitor', 'bookManager', 'admin')
    async updateUser(@Headers() headers, @Param() param, @Body() userDto: UserDto): Promise<User> {
        const token: string = headers.authorization;
        return this.userService.updateUser(token, param.username, userDto);
    }

}