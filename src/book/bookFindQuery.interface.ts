import { Document } from 'mongoose';

export interface BookFindQuery extends Document {
    tags?: string;
    genre?: string;
    author?: string;
}