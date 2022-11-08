import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatroomDto } from './Chatroom.dto';
import { Chatroom, ChatroomDocument } from './Chatroom.schema';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>,
  ) {}

  async create(createChatroomDto: CreateChatroomDto): Promise<Chatroom> {
    // await this.findOne({ $where: { name: createChatroomDto.name } });
    const createdChatroom = new this.chatroomModel(createChatroomDto);
    return createdChatroom.save();
  }

  async findOne(id: string): Promise<Chatroom> {
    return this.chatroomModel.findOne({ id }).exec();
  }

  async deleteOne(id: string) {
    return this.chatroomModel.deleteOne({ id }).exec();
  }

  async findAll(): Promise<Chatroom[]> {
    return this.chatroomModel.find().exec();
  }
}
