import { User } from 'user/user.interface';
import { Book } from 'book/book.interface';

import { IsString, IsOptional, ValidateNested, IsDate } from "class-validator";

export class ReviewDto {
    @IsOptional()
    @ValidateNested()
    user?: User;
    @IsOptional()
    @ValidateNested()
    readonly book: Book;
    @IsOptional()
    @IsString()
    readonly text: string;
}