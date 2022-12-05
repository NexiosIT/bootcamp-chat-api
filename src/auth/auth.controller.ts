import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, LoginResponseDTO } from './dto/LoginDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDTO,
  })
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @ApiResponse({
    status: 201,
    description: 'Valid JWT token for a day.',
    type: LoginResponseDTO,
  })
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiResponse({ status: 401, description: 'Forbidden' })
  @ApiResponse({ status: 200 })
  async logout(@Request() req, @Res() res: Response) {
    this.authService.logout(req.user);
    res.status(200).send();
  }
}
