import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDTO } from './auth/login.entity';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: CreateUserDto,
    description: '[TODO]',
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiResponse({ status: 201, type: LoginDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
