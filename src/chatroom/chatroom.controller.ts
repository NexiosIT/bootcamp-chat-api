import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateChatroomDto } from './chatroom.dto';
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
    status: 200,
    description: 'Chatroom',
    type: Chatroom,
  })
  async create(@Body() newRoom: CreateChatroomDto): Promise<Chatroom> {
    return await this.chatroomService.create(newRoom);
  }
}
