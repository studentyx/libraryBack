import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.Mixed, ref: 'User' },
    book: { type: mongoose.Schema.Types.Mixed, ref: 'Book' },
    text: String,  
});