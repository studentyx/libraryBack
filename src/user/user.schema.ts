import * as mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
        select: false,
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

UserSchema.pre('find', function (next) {
    if (mongoose.Types.ObjectId.isValid(UserSchema._id) === false) {
        throw new HttpException('The id is not valid', HttpStatus.BAD_REQUEST);
    }
    next();
});


