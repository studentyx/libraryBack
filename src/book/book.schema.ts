import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    genre: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    author: {
        type: String
    },
    rating: {
        type: Number
    },
});