import { ReviewDto } from './review.dto';
import { Review } from './review.interface';
import { ReviewSchema } from './review.schema';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'auth/auth.service';
import { UserService } from "../user/user.service";
import { User } from "../user/user.interface";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
    constructor( @InjectModel('Review') private readonly reviewModel: Model<Review>, private readonly userService: UserService) { }

    async create(reviewDto: ReviewDto, username: string): Promise<Review> {
        const userDB: User = await this.userService.findByUsername(username);
        reviewDto.user = userDB;
        const review = new this.reviewModel(reviewDto);
        return await review.save();
    }

    async findAll(query): Promise<Review[]> {
        return await this.reviewModel.find(query).exec();
    }

    async deleteById(id: string): Promise<Review> {
        const condition = { _id: id };
        return await this.reviewModel.remove(condition);
    }

    async updateReview(id: string, reviewDto: ReviewDto): Promise<Review> {
        const condition = { _id: id };
        return await this.reviewModel.update(condition, reviewDto);
    }
}