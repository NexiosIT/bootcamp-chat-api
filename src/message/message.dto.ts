import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '638caf0191684e2d94d0a9df',
  })
  user: string;

  @ApiProperty({
    description: 'The id of the chatroom',
    example: '3u4I34343RO3iI44',
  })
  chatroom: string;

  @ApiProperty({ description: 'The message', example: 'WINTER IS COMMING!' })
  data: string;
}
