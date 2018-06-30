
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UserDto } from 'user/user.dto';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class UserPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === UserDto) {
            value.username = sanitizeHtml(value.username);
            value.password = sanitizeHtml(value.password);
            value.email = sanitizeHtml(value.email);
            value.avatar = sanitizeHtml(value.avatar);
            value.rol = sanitizeHtml(value.rol);
        }else{
            console.log( "Bad Request Exception USER PIPE" );
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}