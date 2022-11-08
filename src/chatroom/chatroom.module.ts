import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllerController } from './chatroom.controller';
import { Chatroom, ChatroomSchema } from './Chatroom.schema';
import { ChatroomService } from './chatroom.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
  ],
  controllers: [ControllerController],
  providers: [ChatroomService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
