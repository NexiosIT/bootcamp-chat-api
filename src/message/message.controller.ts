import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.schema';
import { MessageService } from './message.service';

@ApiTags('Chat messages')
@Controller('messages')
export class ControllerController {
  constructor(private readonly messageService: MessageService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Message',
    type: Message,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAll(): Promise<Message[]> {
    return await this.messageService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Message',
    type: Message,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id): Promise<Message> {
    const result = await this.messageService.findOne(id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Message',
    type: Message,
  })
  @ApiResponse({
    status: 400,
    description: 'Chatroom not found',
  })
  @ApiBearerAuth()
  async create(@Body() newMessage: CreateMessageDto): Promise<Message> {
    const result = await this.messageService.create(newMessage);
    return result;
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
    description: 'Message not found',
  })
  async delete(@Param('id') id, @Res() res: Response) {
    const { deletedCount } = await this.messageService.deleteOne(id);
    res.status(deletedCount === 1 ? 200 : HttpStatus.BAD_REQUEST).send();
  }
}
