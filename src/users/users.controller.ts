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

import * as bcrypt from 'bcrypt';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: User,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

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
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
    const result = await this.usersService.create({
      ...newUser,
      password: hashedPassword,
    });

    return result;
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
    return this.usersService.findOne(req.user.email, true);
  }
}
