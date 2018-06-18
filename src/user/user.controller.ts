import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller(UserController.URL)
export class UserController {
    static URL: string = 'users';
    static LOGIN: string = 'login';
    static USERNAME: string = ':username';

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() userDto: UserDto): Promise<User> {
        return this.userService.create(userDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(UserController.USERNAME)
    async findOne(@Param() param): Promise<User> {
        return this.userService.findByUsername(param.username);
    }

    @Put(UserController.USERNAME)
    async updateUser(@Param() param, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(param.username, userDto);
    }

}