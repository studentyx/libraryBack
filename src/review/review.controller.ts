import { Controller, Get, Post, Body, Param, Delete, Patch, Put, Headers, Query } from '@nestjs/common';
import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewService } from './review.service';
import { AuthService } from 'auth/auth.service';

@Controller(ReviewController.URL)
export class ReviewController {
    static URL: string = 'reviews';
    static ID: string = ':id';
    constructor(private readonly reviewService: ReviewService,
    private readonly authService: AuthService) {}
    
    @Post()
    async create(@Headers() headers, @Body() reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        const username: string = await this.authService.getPayloadFromToken(token).username;
        if (username) {
            return this.reviewService.create(reviewDto, username);
        } else {
            return null;
        }
    }

    @Get()
    async findAll( @Query() query ): Promise<Review[]> {
        return this.reviewService.findAll(query);
    }

    @Delete(ReviewController.ID)
    async delete( @Param() param ){
        return this.reviewService.deleteById( param.id );
    }

    @Put(ReviewController.ID)
    async updateBook(@Param() param, @Body() reviewDto: ReviewDto): Promise<Review> {
        return this.reviewService.updateReview(param.id, reviewDto);
    }

}