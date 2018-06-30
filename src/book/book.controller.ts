import { Controller, Get, Post, Body, Param, Delete, Patch, Headers, Query, UseGuards, HttpStatus, HttpException, UsePipes } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.interface';
import { BookService } from './book.service';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { BookPipe } from 'common/pipes/book.pipe';
import { MongoosePipe } from 'common/pipes/mongoose.pipe';

@Controller(BookController.URL)
@UseGuards(RolesGuard)
export class BookController {
    static URL: string = 'books';
    static ID: string = ':id';
    constructor(private readonly bookService: BookService) { }

    @Post()
    @Roles('bookManager', 'admin')
    async create( @Headers() headers, @Body(new BookPipe()) bookDto: BookDto): Promise<Book> {
        return this.bookService.create(bookDto);
    }

    @Get()
    async findAll( @Query() query): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Get(BookController.ID)
    async findOne( @Param('id', new MongoosePipe()) id ): Promise <Book> {
        const book = await this.bookService.findById(id);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

    @Delete(BookController.ID)
    @Roles('bookManager', 'admin')
    async delete( @Param('id', new MongoosePipe()) id ): Promise <Book> {
        const book = await this.bookService.deleteById(id);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

    @Patch(BookController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async updateBook( @Param('id', new MongoosePipe()) id, @Body(new BookPipe()) bookDto: BookDto): Promise<Book> {
        const book = await this.bookService.updateBook(id, bookDto);
        if ( book === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return book;
    }

}