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
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; userId: string; status: Status },
  ): void {
    const { roomId, userId, status } = payload;
    client.join(roomId);
    this.camService.joinRoom(roomId, userId, status);
    client.to(roomId).emit('userConnected', { userId });

    client.data.roomId = roomId;
    client.data.userId = userId;

    client.on('disconnect', () => {
      client.to(roomId).emit('userDisconnected', { userId });
      this.camService.exitRoom(roomId, userId);
    });
  }

  @SubscribeMessage('exitRoom')
  handleExitRoom(client: Socket): void {
    const { roomId, userId } = client.data;
    client.to(roomId).emit('userDisconnected', { userId });
    this.camService.exitRoom(roomId, userId);
    client.data.roomId = null;
    client.data.userId = null;
  }

  @SubscribeMessage('updateUserStatus')
  handleUpdateUserStatus(client: Socket, payload: { status: Status }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId, userId } = client.data;
    const { status } = payload;
    this.camService.updateStatus(roomId, userId, status);
    client.to(roomId).emit('userStatus', { userId, status });
  }

  @SubscribeMessage('getUserStatus')
  handleGetUserStatus(client: Socket, payload: { userId: string }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = client.data;
    const { userId } = payload;
    const status = this.camService.getStatus(roomId, userId);
    client.emit('userStatus', { userId, status });
  }

  @SubscribeMessage('startScreenShare')
  handleStartScreenShare(client: Socket, payload: { roomId: string }) {
    const { roomId } = payload;
    this.camService.setScreenSharingUser(roomId, client.id);

    client
      .to(roomId)
      .emit('screenShareStarted', { screenSharingUserId: client.id });
  }

  @SubscribeMessage('requestScreenShare')
  handleRequestScreenShare(
    client: Socket,
    payload: { peerId: string; screenSharingUserId: string },
  ) {
    const { peerId, screenSharingUserId } = payload;
    client.to(screenSharingUserId).emit('requestScreenShare', { peerId });
  }

  @SubscribeMessage('endSharingScreen')
  handleEndSharingScreen(client: Socket, payload: { roomId: string }) {
    const { roomId } = payload;
    this.camService.endSharingScreen(roomId);
    client.to(roomId).emit('endSharingScreen');
  }

  @SubscribeMessage('getScreenSharingUser')
  handleGetScreenSharingUser(client: Socket, payload: { roomId: string }) {
    const { roomId } = payload;
    const screenSharingUserInfo =
      this.camService.getScreenSharingUserInfo(roomId);
    if (!screenSharingUserInfo || !screenSharingUserInfo.userId) {
      return;
    }

    client.emit('getScreenSharingUser', {
      screenSharingUserId: screenSharingUserInfo.userId,
    });
  }
}
