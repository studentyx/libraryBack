
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UserDto } from 'user/user.dto';
import htmlspecialchars = require('htmlspecialchars');

@Injectable()
export class UserPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === UserDto) {
            value.username = htmlspecialchars(value.username);
            value.password = htmlspecialchars(value.password);
            value.email = htmlspecialchars(value.email);
            value.avatar = htmlspecialchars(value.avatar);
            value.rol = htmlspecialchars(value.rol);
        }else{
            console.log( "Bad Request Exception USER PIPE" );
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}