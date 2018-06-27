import * as mongoose from 'mongoose';

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

