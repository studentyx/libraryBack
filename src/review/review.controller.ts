import { Controller, Get, Post, Body, Param, Delete, Patch, Put, Headers, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewService } from './review.service';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { JwtService } from 'common/jwt/jwt.service';

@Controller(ReviewController.URL)
@UseGuards(RolesGuard)
export class ReviewController {
    static URL: string = 'reviews';
    static ID: string = ':id';
    constructor(private readonly reviewService: ReviewService,
    private readonly jwtService: JwtService) {}
    
    @Post()
    @Roles('visitor', 'bookManager', 'admin')
    async create(@Headers() headers, @Body() reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        const username: string = await this.jwtService.getPayloadFromToken(token).username;
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
        const review = await this.reviewService.deleteById( token, param.id );
        if ( review === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return review;
    }


    @Put(ReviewController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async updateBook( @Headers() headers, @Param() param, @Body() reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        const review = await this.reviewService.updateReview(token, param.id, reviewDto);
        if ( review === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return review;
    }

}