import { BookDto } from './book.dto';
import { Book } from './book.interface';
import { BookSchema } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BookFindQuery } from 'book/bookFindQuery.interface';

@Injectable()
export class BookService {
    constructor( @InjectModel('Book') private readonly bookModel: Model<Book>) { }

    async create(bookDto: BookDto): Promise<Book> {
        const book = new this.bookModel(bookDto);
        return await book.save();
    }

    async findAll(query): Promise<Book[]> {
        let bookFindQuery: BookFindQuery = {
            tags: query.tags,
            genre: query.genre,
            author: query.author,
        };
        Object.keys(bookFindQuery).forEach(key => !bookFindQuery[key] && delete bookFindQuery[key]);
        return await this.bookModel.find(bookFindQuery).exec();
    }

    async findById(id: string): Promise<Book> {
        return await this.bookModel.findById(id).exec();
    }

    async deleteById(id: string): Promise<Book> {
        const condition = { _id: id };
        return await this.bookModel.findOneAndRemove(condition).exec();
    }

    async updateBook(id: string, bookDto: BookDto): Promise<Book> {
        const condition = { _id: id };
        return await this.bookModel.findOneAndUpdate(condition, bookDto, { new: true }).exec();
    }

}


