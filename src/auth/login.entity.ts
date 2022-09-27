import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @ApiProperty({
    example: 'ey...',
    description: 'The access_token of the User',
  })
  readonly access_token: string;
}
