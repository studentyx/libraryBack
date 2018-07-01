import { Controller, Get, Post, Body, Param, Delete, Patch, Headers, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewService } from './review.service';
import { RolesGuard } from 'common/guards/roles.guard';
import { Roles } from 'common/decorators/roles.decorator';
import { JwtService } from 'common/jwt/jwt.service';
import { ReviewPipe } from 'common/pipes/review.pipe';
import { MongoosePipe } from 'common/pipes/mongoose.pipe';

@Controller(ReviewController.URL)
@UseGuards(RolesGuard)
export class ReviewController {
    static URL: string = 'reviews';
    static ID: string = ':id';
    constructor(private readonly reviewService: ReviewService,
    private readonly jwtService: JwtService) {}
    
    @Post()
    @Roles('visitor', 'bookManager', 'admin')
    async create(@Headers() headers, @Body(new ReviewPipe()) reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        const username: string = await this.jwtService.getPayloadFromToken(token).username;
        if (username) {
            const review: Review = await this.reviewService.create(reviewDto, username);
            if ( review == null ){
                throw new HttpException('A review by that user already exists', HttpStatus.CONFLICT);
            }
            return review;
        } else {
            return null;
        }
    }

    @Get()
    async findAll( @Query() query ): Promise<Review[]> {
        return this.reviewService.findAll(query.book, undefined);
    }

    @Delete(ReviewController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async delete( @Headers() headers, @Param('id', new MongoosePipe()) id ){
        const token: string = headers.authorization;
        const review = await this.reviewService.deleteById( token, id );
        if ( review === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return review;
    }


    @Patch(ReviewController.ID)
    @Roles('visitor', 'bookManager', 'admin')
    async updateBook( @Headers() headers, @Param('id', new MongoosePipe()) id, @Body(new ReviewPipe()) reviewDto: ReviewDto): Promise<Review> {
        const token: string = headers.authorization;
        const review = await this.reviewService.updateReview(token, id, reviewDto);
        if ( review === null ){
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return review;
    }

}