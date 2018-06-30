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