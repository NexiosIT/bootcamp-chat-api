import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketService } from 'src/socket/socket.service';
import { CreateChatroomDto } from './chatroom.dto';
import { Chatroom, ChatroomDocument } from './chatroom.schema';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>,
  ) {}

  @Inject(SocketService)
  private readonly socketService: SocketService;

  async create(createChatroomDto: CreateChatroomDto): Promise<Chatroom> {
    const createdChatroom = new this.chatroomModel(createChatroomDto);
    this.socketService.sendMessage('new_chatroom', createdChatroom);
    return createdChatroom.save();
  }

  async findOne(id: string): Promise<Chatroom> {
    return this.chatroomModel.findOne({ id }).exec();
  }

  async deleteOne(id: string) {
    return this.chatroomModel.deleteOne({ id }).exec();
  }

  async findAll(userId?: string): Promise<Chatroom[]> {
    return this.chatroomModel
      .find({ ...('userId' && { allowed_users: userId }) })
      .exec();
  }
}
