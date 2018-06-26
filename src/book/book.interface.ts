import { Document } from 'mongoose';

export interface Book extends Document {
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly genre: string[];
    readonly tags: string[];
    readonly author: string[];
}