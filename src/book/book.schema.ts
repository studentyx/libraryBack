import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    genre: [String],
    tags: [String],
    author: String,
    rating: Number,
});