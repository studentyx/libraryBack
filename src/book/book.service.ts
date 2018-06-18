import { BookDto } from './book.dto';
import { Book } from './book.interface';
import { BookSchema } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
    constructor( @InjectModel('Book') private readonly bookModel: Model<Book>) { }

    async create(bookDto: BookDto): Promise<Book> {
        const book = new this.bookModel(bookDto);
        return await book.save();
    }

    async findAll(query): Promise<Book[]> {
        return await this.bookModel.find(query).exec();
    }

    async findById(id: string): Promise<Book[]> {
        return await this.bookModel.findById(id).exec();
    }

    async deleteById(id: string): Promise<Book> {
        const condition = { _id: id };
        return await this.bookModel.remove(condition);
    }

    async updateBook(id: string, bookDto: BookDto): Promise<Book> {
        const condition = { _id: id };
        return await this.bookModel.update(condition, bookDto);
    }
}


