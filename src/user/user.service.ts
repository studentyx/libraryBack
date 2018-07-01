import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserDto } from './user.dto';
import { UserSchema } from './user.schema';
import * as bcrypt from 'bcrypt';
import request = require('supertest');

@Injectable()
export class UserService {
  constructor( @InjectModel('User') private readonly userModel: Model<User>) { }

  async hashPassword(user): Promise<any> {
    const password = user.password;
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash);
      });
    })

    return hashedPassword;
  }

  async recaptchaVerification(url: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      const peticion = request.agent(url);
      peticion.post('')
        .end((err, res) => {
          if (res.body.success === true) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async create(userDto: UserDto, recaptchaUrl: string): Promise<User> {
    const recaptcha: boolean = await this.recaptchaVerification(recaptchaUrl);
    if (recaptcha === false) {
      throw new HttpException('Invalid captcha', HttpStatus.BAD_REQUEST);
    }
    if (userDto.password.length < 1) {
      throw new HttpException('The password must have a minimum length of 1', HttpStatus.BAD_REQUEST);
    }

    const condition = { username: userDto.username };
    let userCount = await this.userModel.count(condition).exec();

    if (userCount <= 0) {
      const saltRounds = 10;
      userDto.password = await bcrypt.hash(userDto.password, saltRounds);
      userDto.rol = 'visitor';
      const user = new this.userModel(userDto);
      return await user.save();
    } else {
      throw new HttpException('Username is already taken', HttpStatus.CONFLICT);
    }
  }

  async findByUsername(username: string, selectPassword: boolean): Promise<User> {
    let query = this.userModel.findOne({ username: username });
    if (selectPassword === true) {
      query.select('+password');
    }
    const user: User = await query.exec();
    return user;
  }

  async updateUser(token: string, username: string, userDto: UserDto): Promise<User> {
    let user: User = null;

    const userDB: User = await this.userModel.findOne({ username }).exec();
    if (userDB !== null) {
      userDto.username = userDB.username;
      userDto.rol = userDB.rol;
      if (userDto.password) {
        if (userDto.password.length < 1) {
          throw new HttpException('The password must have a minimum length of 1', HttpStatus.BAD_REQUEST);
        }
        userDto.password = await bcrypt.hash(userDto.password, 10);
      }
      const condition = { username: username };
      user = await this.userModel.findOneAndUpdate(condition, userDto, { new: true }).exec();
    }
    return user;
  }




}