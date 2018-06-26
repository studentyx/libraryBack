import * as mongoose from 'mongoose';

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
        type: [String]
    },
    tags: {
        type: [String]
    },
    author: {
        type: String,
        default: '',
    },
});