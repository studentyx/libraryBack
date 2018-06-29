import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class UserDto {

  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  avatar?: string;
  @IsOptional()
  @IsString()
  rol: string;
}