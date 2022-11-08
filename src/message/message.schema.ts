import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  @ApiProperty({ description: 'The id of the user' })
  user: string;

  // @Prop({ required: true })
  // @ApiProperty({ description: 'The id of the chatroom' })
  // chatroom: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Chatroom', required: true })
  @ApiProperty({ description: 'The id of the chatroom' })
  chatroom!: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ description: 'The message' })
  data: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The date of publish message',
  })
  published_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// MessageSchema.virtual('chatroom2', {
//   ref: 'Chatroom',
//   localField: 'chatroom',
//   foreignField: '_id',
//   justOne: true,
// });
