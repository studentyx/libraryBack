import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.Mixed, ref: 'User' },
    book: { type: mongoose.Schema.Types.Mixed, ref: 'Book' },
    text: { type: String},  
});