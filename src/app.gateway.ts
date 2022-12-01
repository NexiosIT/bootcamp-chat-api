import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebSocketServer as WebSocketServerType } from 'ws';
import { SocketService } from './socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}
  @WebSocketServer() public server: WebSocketServerType;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: WebSocketServerType) {
    this.socketService.socket = server;
  }

  handleDisconnect() {
    this.logger.log(`Client disconnected`);
  }

  handleConnection() {
    this.logger.log(`Client connected`);
  }
}
