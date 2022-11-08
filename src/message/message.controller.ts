import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.schema';
import { MessageService } from './message.service';

@ApiTags('Chat messages')
@Controller('messages')
export class ControllerController {
  constructor(private readonly messageService: MessageService) {}
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

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Message',
    type: Message,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id): Promise<Message[]> {
    const result = await this.messageService.findAll();
    return result;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Message',
    type: Message,
  })
  @ApiBearerAuth()
  async create(
    @Body() newMessage: CreateMessageDto,
    @Res() res: Response,
  ): Promise<Message> {
    const result = await this.messageService.create(newMessage);
    return result;
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OKs',
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
