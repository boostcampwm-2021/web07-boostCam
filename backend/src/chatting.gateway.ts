import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

type messageData = {
  msg: string;
  room: string;
};

@WebSocketGateway()
export class ChattingGateway {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(`server is started!`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`${client.id} is connected!`);
    client.join('init');
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} is disconnected!`);
  }

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
