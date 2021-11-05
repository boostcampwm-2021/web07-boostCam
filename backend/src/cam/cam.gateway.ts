import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type messageData = {
  msg: string;
  room: string;
};

@WebSocketGateway()
export class CamGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; userId: string },
  ): void {
    const { roomId, userId } = payload;
    client.join(roomId);
    client.to(roomId).emit('userConnected', { userId });
    client.on('disconnect', () => {
      client.to(roomId).emit('userDisconnected', { userId });
    });
    client.on('userToggleAudio', () => {
      client.to(roomId).emit('userToggleAudio', { userId });
    });
    client.on('userToggleVideo', () => {
      client.to(roomId).emit('userToggleVideo', { userId });
    });
  }

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
