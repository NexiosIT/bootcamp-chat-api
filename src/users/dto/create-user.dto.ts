import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'test',
    description: 'The name of the User',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    example: 'demo@nexiosit.com',
    description: 'E-mail of the User',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'demo',
    description: 'The password of the User',
  })
  readonly password: string;
}
