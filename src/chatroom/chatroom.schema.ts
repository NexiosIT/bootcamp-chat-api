import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ChatroomDocument = HydratedDocument<Chatroom>;

@Schema()
export class Chatroom {
  @Prop({ required: true })
  @ApiProperty({
    example: "Night's Watch",
    description: 'The name of the chatroom',
  })
  name: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The ids of the allowed users in the chatroom',
  })
  allowed_users: string[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
ChatroomSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chatroom',
});
