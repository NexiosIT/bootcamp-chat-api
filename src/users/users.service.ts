import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketService } from '../socket/socket.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './users.schema';
const usersProjection = {
  __v: false,
  password: false,
};
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Inject(SocketService)
  private readonly socketService: SocketService;

  async findOne(
    email: string,
    projectionEnabled?: boolean,
  ): Promise<User | undefined> {
    return this.userModel.findOne(
      { email },
      projectionEnabled ? usersProjection : {},
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, usersProjection);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const userWithEmail = await this.userModel.findOne({
      email: newUser.email,
    });
    if (userWithEmail) throw new BadRequestException('E-mail already used');
    const userWithUsername = await this.userModel.findOne({
      username: newUser.username,
    });
    if (userWithUsername)
      throw new BadRequestException('Username already used');
    const createdUser = new this.userModel(newUser);
    const result = await createdUser.save();

    this.socketService.sendMessage('new_user', {
      email: result.email,
      username: result.username,
      _id: result._id
    });
    return;
  }
}
