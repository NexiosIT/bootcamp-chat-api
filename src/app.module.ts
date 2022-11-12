import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatroomModule,
    MessageModule,
    MongooseModule.forRoot(
      'mongodb+srv://api:Hepfod-canvyr-1dykvu@cluster0.ltvdow2.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
