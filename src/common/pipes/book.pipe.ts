
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import htmlspecialchars = require('htmlspecialchars');
import { BookDto } from 'book/book.dto';

@Injectable()
export class BookPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === BookDto) {
            value.title = htmlspecialchars(value.title);
            value.image = htmlspecialchars(value.image);
            value.description = htmlspecialchars(value.description);

            for (let i = 0; i < value.genre.length; i++) {
                value.genre[i] = htmlspecialchars(value.genre[i]);
            }

            for (let i = 0; i < value.tags.length; i++) {
                value.tags[i] = htmlspecialchars(value.tags[i]);
            }
        } else {
            console.log("Bad Request Exception BOOK PIPE");
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}