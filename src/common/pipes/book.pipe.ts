
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BookDto } from 'book/book.dto';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class BookPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === BookDto) {      
            delete value['_id'];
            if ( value.title ){
                value.title = sanitizeHtml(value.title);
            }
            if ( value.image ){
                value.image = sanitizeHtml(value.image);
            }
            if ( value.description ){
                value.description = sanitizeHtml(value.description);
            }

            if ( value.genre ){
                for (let i = 0; i < value.genre.length; i++) {
                    value.genre[i] = sanitizeHtml(value.genre[i]);
                }
            }

            if ( value.tags ){
                for (let i = 0; i < value.tags.length; i++) {
                    value.tags[i] = sanitizeHtml(value.tags[i]);
                }
            }

            if ( value.author ){
                for (let i = 0; i < value.author.length; i++) {
                    value.author[i] = sanitizeHtml(value.author[i]);
                }
            }

        } else {
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}