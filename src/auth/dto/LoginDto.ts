import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @ApiProperty({
    example: 'jonsnow@got.hr',
    description: 'E-mail of the user who wants to login',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'johnny123',
    description: 'Password of the user who wants to login',
  })
  readonly password: string;
}
export class LoginResponseDTO {
  @IsString()
  @ApiProperty({
    example: '...',
    description: 'The access_token of the User',
  })
  readonly access_token: string;
}
