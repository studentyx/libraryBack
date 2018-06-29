
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import htmlspecialchars = require('htmlspecialchars');
import { ReviewDto } from 'review/review.dto';

@Injectable()
export class ReviewPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === ReviewDto) {
            value.text = htmlspecialchars(value.text);
        }else{
            console.log( "Bad Request Exception REVIEW PIPE" );
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}