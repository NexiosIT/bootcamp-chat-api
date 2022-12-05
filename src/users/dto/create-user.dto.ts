import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'JonSnow',
    description: 'The name of the User',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    example: 'jonsnow@got.hr',
    description: 'E-mail of the User',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'johnny123',
    description: 'The password of the User',
  })
  readonly password: string;
}
