import { Document } from 'mongoose';

export interface JwtPayload extends Document {
    readonly username: string;
}