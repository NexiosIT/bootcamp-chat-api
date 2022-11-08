import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  // constructor(private readonly catsService: CatsService) {}

  @Post()
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
}
