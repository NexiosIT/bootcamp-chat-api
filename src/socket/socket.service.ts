import { Injectable } from '@nestjs/common';
import { WebSocketServer } from 'ws';

@Injectable()
export class SocketService {
  public socket: WebSocketServer = null;

  sendMessage(event: string, data: any) {
    this.socket.clients.forEach(function (client) {
      client.send(JSON.stringify({ event, data }));
      client.emit(event, data);
    });
  }
}
