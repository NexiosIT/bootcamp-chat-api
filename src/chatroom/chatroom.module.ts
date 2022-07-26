import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from '../socket/socket.module';
import { ControllerController } from './chatroom.controller';
import { Chatroom, ChatroomSchema } from './chatroom.schema';
import { ChatroomService } from './chatroom.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
    SocketModule,
  ],
  controllers: [ControllerController],
  providers: [ChatroomService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
