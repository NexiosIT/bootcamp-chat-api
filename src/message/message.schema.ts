import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  @ApiProperty({
    description: 'The id of the user',
    example: '638caf0191684e2d94d0a9df',
  })
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Chatroom', required: true })
  @ApiProperty({
    description: 'The id of the chatroom',
    example: "Night's Watch",
  })
  chatroom!: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ description: 'The message', example: 'WINTER IS COMMING!' })
  data: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The date of publish message',
    example: '1970-01-01T20:14:43.769Z',
  })
  published_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
