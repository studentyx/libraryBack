import { Document } from 'mongoose';
import { User } from 'user/user.interface';
import { Book } from 'book/book.interface';

export interface Review extends Document {
    readonly user: User;
    readonly book: Book;
    readonly text: string;
}