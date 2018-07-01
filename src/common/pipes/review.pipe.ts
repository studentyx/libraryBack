
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ReviewDto } from 'review/review.dto';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class ReviewPipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (metatype === ReviewDto) {
            if ( value.text ){
                value.text = sanitizeHtml(value.text);
            } 
        }else{
            throw new BadRequestException('Incorrect data type');
        }
        return value;
    }
}