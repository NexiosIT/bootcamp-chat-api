import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { ControllerController } from './message.controller';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatroomModule,
  ],
  controllers: [ControllerController],
  providers: [MessageService],
})
export class MessageModule {}
