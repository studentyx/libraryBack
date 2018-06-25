export class UserDto {
    username: string;
    password: string;
    readonly email?: string;
    readonly avatar?: string;
    rol: string;
  }