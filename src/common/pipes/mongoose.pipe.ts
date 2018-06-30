import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoosePipe implements PipeTransform<any> {
    async transform(value, { metatype }: ArgumentMetadata) {

        if ( mongoose.Types.ObjectId.isValid(value) === false) {
            throw new HttpException( 'The provided parameter ' + value + ' is not a valid mongoDB Id' , HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}