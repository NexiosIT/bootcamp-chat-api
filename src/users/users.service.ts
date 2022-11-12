import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private messageModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.messageModel.findOne({ username });
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const createdMessage = new this.messageModel(newUser);
    return createdMessage.save();
  }
}
