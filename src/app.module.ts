import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SocketModule,
    AuthModule,
    UsersModule,
    ChatroomModule,
    MessageModule,
    MongooseModule.forRoot(
      'mongodb+srv://api:Hepfod-canvyr-1dykvu@cluster0.ltvdow2.mongodb.net/dev?retryWrites=true&w=majority',
    ),
  ],
  providers: [AppGateway],
})
export class AppModule {}
