import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private messageModel: Model<UserDocument>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.messageModel.findOne({ email });
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const userWithEmail = this.messageModel.findOne({ email: newUser.email });
    if (userWithEmail) throw new BadRequestException('E-mail already used');
    const userWithUsername = this.messageModel.findOne({
      username: newUser.username,
    });
    if (userWithUsername)
      throw new BadRequestException('Username already used');
    const createdMessage = new this.messageModel(newUser);
    return createdMessage.save();
  }
}
