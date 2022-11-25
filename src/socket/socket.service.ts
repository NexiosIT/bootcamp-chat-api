import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  public socket: Server = null;

  sendMessage(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
