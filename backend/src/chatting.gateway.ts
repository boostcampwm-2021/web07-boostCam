import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

type CurrentDate = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minutes: number;
};

type MsgInfo = {
  msg: string;
  room: string | null;
  user: string;
  date: CurrentDate;
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
  handleMessage(client: Socket, data: MsgInfo): void {
    client.broadcast.to(data.room).emit('receiveMessage', data);
  }

  @SubscribeMessage('setRoom')
  handleSetRoom(client: Socket, room: string): void {
    client.join(room);
  }
}
