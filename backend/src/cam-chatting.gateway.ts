import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

interface messageData {
  msg: string;
  room: string;
}

@WebSocketGateway()
export class CamChattingGateway {}
