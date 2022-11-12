import {
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  // constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Register an user',
    type: CreateUserDto,
  })
  create(): string[] {
    return [];
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 201,
  })
  delete(): string[] {
    return [];
  }
}
