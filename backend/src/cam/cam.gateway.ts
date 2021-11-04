import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CamGateway {
  @SubscribeMessage('joinRoom')
  handleMessage(
    client: Socket,
    payload: { roomId: string; userId: string },
  ): void {
    const { roomId, userId } = payload;
    client.join(roomId);
    client.to(roomId).emit('userConnected', { userId });
    client.on('disconnect', () => {
      client.to(roomId).emit('userDisconnected', { userId });
    });
    client.on('userChangeStatus', ({ userId, status }) => {
      client.to(roomId).emit('userChangeStatus', { userId, status });
    });
  }
}
