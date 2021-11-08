import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import Status from 'src/types/cam';
import { CamService } from './cam.service';

@WebSocketGateway()
export class CamGateway {
  constructor(private camService: CamService) {
    this.camService.createRoom('1');
  }
  @SubscribeMessage('joinRoom')
  handleMessage(
    client: Socket,
    payload: { roomId: string; userId: string; status: Status },
  ): void {
    const { roomId, userId, status } = payload;
    client.join(roomId);
    this.camService.joinRoom(roomId, userId, status);
    client.to(roomId).emit('userConnected', { userId });

    client.on('disconnect', () => {
      client.to(roomId).emit('userDisconnected', { userId });
      this.camService.exitRoom(roomId, userId);
    });

    client.on('updateUserStatus', ({ status }) => {
      this.camService.updateStatus(roomId, userId, status);
      client.to(roomId).emit('userStatus', { userId, status });
    });

    client.on('getUserStatus', ({ userId }) => {
      const status = this.camService.getStatus(roomId, userId);
      client.emit('userStatus', { userId, status });
    });
  }
}
