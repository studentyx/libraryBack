import { Controller, Get, Post, Body, Param, Delete, Patch, Headers, Query, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.interface';
import { BookService } from './book.service';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

@Controller(BookController.URL)
@UseGuards(RolesGuard)
export class BookController {
    static URL: string = 'books';
    static ID: string = ':id';
    constructor(private readonly bookService: BookService) { }

    @Post()
    @Roles('bookManager', 'admin')
    async create( @Headers() headers, @Body() bookDto: BookDto): Promise<Book> {
        return this.bookService.create(bookDto);
    }

    @Get()
    async findAll( @Query() query): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Get(BookController.ID)
    async findOne( @Param() param): Promise <Book> {
        const book = await this.bookService.findById(param.id);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

    @Delete(BookController.ID)
    @Roles('bookManager', 'admin')
    async delete( @Param() param): Promise <Book> {
        const book = await this.bookService.deleteById(param.id);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

    @Patch(BookController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async updateBook( @Param() param, @Body() bookDto: BookDto): Promise<Book> {
        const book = await this.bookService.updateBook(param.id, bookDto);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

}