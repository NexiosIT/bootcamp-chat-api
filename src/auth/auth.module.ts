import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SocketModule,
  ],
  providers: [AuthService, JwtStrategy, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
