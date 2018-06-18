export class UserDto {
    readonly username: string;
    password: string;
    readonly email?: string;
    readonly avatar?: string;
    readonly rol: string;
  }