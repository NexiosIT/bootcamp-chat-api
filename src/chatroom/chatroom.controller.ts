import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatroomDto } from './chatroom.dto';
import { Chatroom } from './chatroom.git.schema';
import { ChatroomService } from './chatroom.service';

@ApiTags('Chatrooms')
@Controller('rooms')
export class ControllerController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Chatroom',
    type: Chatroom,
    isArray: true,
  })
  async findAll(): Promise<Chatroom[]> {
    return await this.chatroomService.findAll();
  }

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
