import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Chatroom } from './chatroom.schema';
import { ChatroomService } from './chatroom.service';

@ApiTags('Chatrooms')
@Controller('rooms')
export class ControllerController {
  constructor(private readonly chatroomService: ChatroomService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Chatroom',
    type: Chatroom,
    isArray: true,
  })
  async findAll(@Request() req): Promise<Chatroom[]> {
    return await this.chatroomService.findAll(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Chatroom',
    type: Chatroom,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id): Promise<Chatroom> {
    return await this.chatroomService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Chatroom',
    type: Chatroom,
  })
  @ApiResponse({
    status: 400,
    description: 'Chatroom already exist',
  })
  async create(@Body() newRoom: Chatroom): Promise<Chatroom> {
    return await this.chatroomService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Chatroom not found',
  })
  async delete(@Param('id') id, @Res() res: Response) {
    const { deletedCount } = await this.chatroomService.deleteOne(id);
    res.status(deletedCount === 1 ? 200 : HttpStatus.BAD_REQUEST).send();
  }
}
