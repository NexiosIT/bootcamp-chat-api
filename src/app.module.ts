import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SocketModule,
    AuthModule,
    UsersModule,
    ChatroomModule,
    MessageModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
