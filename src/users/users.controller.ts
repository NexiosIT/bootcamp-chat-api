import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Register an user',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    schema: {
      anyOf: [
        {
          title: 'Username',
          description: `Username already used`,
          example: `Username already used`,
        },
        {
          title: 'E-mail',
          description: `E-mail already used`,
          example: `E-mail already used`,
        },
      ],
    },
  })
  async create(@Body() newUser: CreateUserDto): Promise<User> {
    return await this.usersService.create(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Get profile of the user based on token',
    type: User,
  })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
