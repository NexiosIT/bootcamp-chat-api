import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDTO } from './login.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: CreateUserDto,
    description: '[TODO]',
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiResponse({ status: 201, type: LoginDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @ApiResponse({ status: 201 })
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}
