import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocketService } from 'src/socket/socket.service';
import { ChatroomService } from '../chatroom/chatroom.service';
import { CreateMessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  @Inject(ChatroomService)
  private readonly chatroomService: ChatroomService;

  @Inject(SocketService)
  private readonly socketService: SocketService;

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const chatroom = await this.chatroomService.findOne(
      createMessageDto.chatroom,
    );
    if (!chatroom) throw new BadRequestException('Chatroom not found');
    const createdMessage = new this.messageModel({
      ...createMessageDto,
      published_at: new Date(),
    });
    this.socketService.sendMessage('new_message', createdMessage);
    return createdMessage.save();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findOne({ id }).populate('chatroom').exec();
  }

  async deleteOne(id: string) {
    return this.messageModel.deleteOne({ id }).exec();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().populate('chatroom').exec();
  }
}
