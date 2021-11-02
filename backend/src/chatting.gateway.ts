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
export class ChattingGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, data: messageData): void {
    const addedMsg = `received : ${data.msg}`;
    client.broadcast.to(data.room).emit('receiveMessage', addedMsg);
  }

  @SubscribeMessage('setRoom')
  handleSetRoom(client: Socket, room: string): void {
    client.join(room);
  }
}
