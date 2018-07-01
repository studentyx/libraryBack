import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewSchema } from './review.schema';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from "../user/user.service";
import { User } from "../user/user.interface";
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtPayload } from 'common/jwt/JwtPayload.interface';
import { JwtService } from 'common/jwt/jwt.service';
import * as mongoose from 'mongoose';
import { ReviewFindQuery } from 'review/reviewFindQuery';

@Injectable()
export class ReviewService {
    constructor( @InjectModel('Review') private readonly reviewModel: Model<Review>,
        private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async create(reviewDto: ReviewDto, username: string): Promise<Review> {
        if ( !reviewDto.book ){
            throw new HttpException( 'Invalid book data for review', HttpStatus.BAD_REQUEST );
        }
        const userDB: User = await this.userService.findByUsername(username, false);
        reviewDto.user = userDB;
        const userBookReviews: Review[] = await this.findAll(reviewDto.book._id, userDB._id);
        if (userBookReviews.length > 0) {
            return null;
        } else {
            const review = new this.reviewModel(reviewDto);
            return await review.save();
        }
    }

    async findAll(bookId: string, userId: string): Promise<Review[]> {

        let reviewFindQuery: ReviewFindQuery = {
            user: userId,
            book: bookId,
        };
        Object.keys(reviewFindQuery).forEach(key => !reviewFindQuery[key] && delete reviewFindQuery[key]);
        Object.keys(reviewFindQuery).forEach(key => {
            if (mongoose.Types.ObjectId.isValid(reviewFindQuery[key]) === false) {
                throw new HttpException('The provided parameter ' + reviewFindQuery[key] + ' is not a valid mongoDB Id', HttpStatus.BAD_REQUEST);
            }
        });
        return await this.reviewModel.find(reviewFindQuery).sort('-date').populate('user').populate('book').exec();
    }

    async findById(id: string): Promise<Review> {
        return await this.reviewModel.findById(id).populate('user').populate('book').exec();
    }

    async reviewByToken(token: string, id: string): Promise<Review> {
        let returnValue = null;
        const reviewDB: Review = await this.findById(id);

        if (reviewDB !== null) {
            let payload: JwtPayload = this.jwtService.getPayloadFromToken(token);
            if (payload.rol === 'admin' || reviewDB.user.username === payload.username) {
                returnValue = reviewDB;
            }
        }
        return returnValue;
    }

    async deleteById(token: string, id: string): Promise<Review> {
        const reviewDB = await this.reviewByToken(token, id);
        if (reviewDB !== null) {
            const condition = { _id: id };
            return await this.reviewModel.findOneAndRemove(condition).populate('user').populate('book').exec();
        } else {
            return reviewDB;
        }
    }

    async updateReview(token: string, id: string, reviewDto: ReviewDto): Promise<Review> {
        const reviewDB = await this.reviewByToken(token, id);
        if (reviewDB !== null) {
            const condition = { _id: id };
            return await this.reviewModel.findOneAndUpdate(condition, reviewDto, { new: true }).populate('user').populate('book').exec();
        } else {
            return reviewDB;
        }
    }
}