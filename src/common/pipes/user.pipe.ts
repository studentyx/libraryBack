
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UserDto } from 'user/user.dto';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class UserPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === UserDto) {
            delete value['_id'];
            Object.keys(value).forEach(key => {
                if ( value[key] ){
                    value[key] = sanitizeHtml( value[key] );
                }
            });
        }else{
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}