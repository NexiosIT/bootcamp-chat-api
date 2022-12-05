import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomModule } from '../chatroom/chatroom.module';
import { SocketModule } from '../socket/socket.module';
import { ControllerController } from './message.controller';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatroomModule,
    SocketModule,
  ],
  controllers: [ControllerController],
  providers: [MessageService],
})
export class MessageModule {}
