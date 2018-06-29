import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
    },
    description: {
        type: String,
        default: '',
    },
    genre: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    author: {
        type: [String],
        default: [],
    },
});

BookSchema.pre('find', function (next) {
    if (mongoose.Types.ObjectId.isValid(BookSchema._id) === false) {
        throw new HttpException('The id is not valid', HttpStatus.BAD_REQUEST);
    }
    next();
});