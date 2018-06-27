import { User } from 'user/user.interface';
import { Book } from 'book/book.interface';

export class ReviewDto {
    user?: User;
    readonly book: Book;
    readonly text: string;
    readonly date: Date;
}