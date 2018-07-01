import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: 'password',
        select: false,
        minlength: 1,
    },
    email: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
    },
    rol: {
        type: String,
        default: 'visitor',
    },
});



