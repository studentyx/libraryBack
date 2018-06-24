import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false,
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    rol: {
        type: String
    },
});

