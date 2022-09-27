import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: number;

  @ApiProperty({
    example: 'nexios',
    description: 'The name of the User',
  })
  username: string;

  // @ApiProperty({
  //   example: 'demo',
  //   description: 'The password of the User',
  // })
  password: string;
}
