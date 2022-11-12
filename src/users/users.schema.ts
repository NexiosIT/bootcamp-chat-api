import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty({
    example: 'nexios',
    description: 'The name of the User',
  })
  username: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'demo@nexiosit.com',
    description: 'E-mail adress of the User',
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
