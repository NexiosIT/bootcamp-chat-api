import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty({
    example: 'JonSnow',
    description: 'The name of the User',
  })
  username: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'jonsnow@got.hr',
    description: 'E-mail adress of the User',
  })
  email: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '638caeea91684e2d94d0a9d5',
    description: 'Unique id of the User',
  })
  _id: string;

  @ApiHideProperty()
  @Prop({ required: true })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
