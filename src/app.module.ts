import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { UsersController } from './users/users.controller';
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
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
