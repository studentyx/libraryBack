import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewSchema } from './review.schema';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'auth/auth.service';
import { UserService } from "../user/user.service";
import { User } from "../user/user.interface";
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';

@Injectable()
export class ReviewService {
    constructor( @InjectModel('Review') private readonly reviewModel: Model<Review>, 
    private readonly userService: UserService, private readonly authService: AuthService) { }

    async create(reviewDto: ReviewDto, username: string): Promise<Review> {
        const userDB: User = await this.userService.findByUsername(username);
        reviewDto.user = userDB;
        const review = new this.reviewModel(reviewDto);
        return await review.save();
    }

    async findAll(query): Promise<Review[]> {
        return await this.reviewModel.find(query).exec();
    }

    async deleteById(token: string, id: string): Promise<Review> {

        const reviewDB: Review = await this.reviewModel.findById(id).exec()
        let payload: JwtPayload = this.authService.getPayloadFromToken( token );

        if ( payload.rol === 'admin' || reviewDB.user.username === payload.username ){
            const review = new this.reviewModel(reviewDB);
            return await review.remove();
        }else{
            return null;
        }
    }

    async updateReview(token: string, id: string, reviewDto: ReviewDto): Promise<Review> {
        const reviewDB: Review = await this.reviewModel.findById(id).exec()
        let payload: JwtPayload = this.authService.getPayloadFromToken( token );

        if ( payload.rol === 'admin' || reviewDB.user.username === payload.username ){
            const review = new this.reviewModel(reviewDB);
            return await review.update(reviewDto);
        }else{
            return null;
        }
    }
}