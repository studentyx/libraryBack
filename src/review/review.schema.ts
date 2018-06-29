import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    text: { 
        type: String,
        default: '',
    },  
    date: { type: Date, default: Date.now },
});

ReviewSchema.pre('find', function (next) {
    if (mongoose.Types.ObjectId.isValid(ReviewSchema._id) === false) {
        throw new HttpException('The id is not valid', HttpStatus.BAD_REQUEST);
    }
    next();
});