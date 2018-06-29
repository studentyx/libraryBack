import { IsString, IsOptional, IsArray } from "class-validator";

export class BookDto {

    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    image: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsArray()
    genre: string[];
    @IsOptional()
    @IsArray()
    tags: string[];
    @IsOptional()
    @IsArray()
    author: string[];
}