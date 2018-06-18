import { Controller, Get, Post, Body, Param, Delete, Patch, Put, Headers, Query } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.interface';
import { BookService } from './book.service';

@Controller(BookController.URL)
export class BookController {
    static URL: string = 'books';
    static ID: string = ':id';
    constructor(private readonly bookService: BookService) { }

    @Post()
    async create( @Headers() headers, @Body() bookDto: BookDto): Promise<Book> {
        return this.bookService.create(bookDto);
    }

    @Get()
    async findAll( @Query() query): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Get(BookController.ID)
    async findOne( @Param() param): Promise<Book[]> {
        return this.bookService.findById(param.id);
    }

    @Delete(BookController.ID)
    async delete( @Param() param) {
        return this.bookService.deleteById(param.id);
    }

    @Put(BookController.ID)
    async updateBook( @Param() param, @Body() bookDto: BookDto): Promise<Book> {
        return this.bookService.updateBook(param.id, bookDto);
    }

}