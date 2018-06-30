import { Document } from 'mongoose';

export interface ReviewFindQuery extends Document {
    user?: string;
    book?: string;
}