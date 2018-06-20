import { Controller, Get, Post, Body, Param, Delete, Patch, Put, Headers, Query, UseGuards } from '@nestjs/common';
import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewService } from './review.service';
import { AuthService } from 'auth/auth.service';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';

@Controller(ReviewController.URL)
@UseGuards(RolesGuard)
export class ReviewController {
    static URL: string = 'reviews';
    static ID: string = ':id';
    constructor(private readonly reviewService: ReviewService,
    private readonly authService: AuthService) {}
    
    @Post()
    @Roles('visitor', 'bookManager', 'admin')
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
    @Roles('visitor', 'bookManager', 'admin')
    async delete( @Headers() headers, @Param() param ){
        const token: string = headers.authorization;
        return this.reviewService.deleteById( token, param.id );
    }

    @Put(ReviewController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async updateBook( @Headers() headers, @Param() param, @Body() reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        return this.reviewService.updateReview(token, param.id, reviewDto);
    }

}