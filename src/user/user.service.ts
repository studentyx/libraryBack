import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserDto } from './user.dto';
import { UserSchema } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor( @InjectModel('User') private readonly userModel: Model<User>) { }

  async hashPassword (user): Promise<any> {
    
      const password = user.password;
      const saltRounds = 10;
    
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash);
        });
      })
    
      return hashedPassword;
    }

    
  async create(userDto: UserDto): Promise<User> {
    const condition = { username: userDto.username };
    let userCount = await this.userModel.count(condition).exec();

    if (userCount <= 0) {
      const saltRounds = 10;
      userDto.password = await bcrypt.hash( userDto.password, saltRounds );
      userDto.rol = 'visitor';
      const user = new this.userModel(userDto);
      return await user.save();
    } else {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<User> {
    const user: User = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async updateUser(token: string, username: string, userDto: UserDto): Promise<User> {

    const userDB: User = await this.userModel.findOne({ username }).exec();
    userDto.rol = userDB.rol;
    userDto.password = await bcrypt.hash( userDto.password, 10 );
    const user = new this.userModel(userDB);
    return await user.update(userDto);


  }




}