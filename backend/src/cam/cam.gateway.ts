import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { Status, MessageInfo } from '../types/cam';
import { CamInnerService } from './cam-inner.service';

@WebSocketGateway()
export class CamGateway {
  @WebSocketServer() server: Server;
  constructor(private camInnerService: CamInnerService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    payload: {
      roomId: string;
      userId: string;
      userNickname: string;
      status: Status;
    },
  ): void {
    const { roomId, userId, userNickname, status } = payload;
    client.join(roomId);
    this.camInnerService.joinRoom(
      roomId,
      userId,
      client.id,
      userNickname,
      status,
    );
    client.to(roomId).emit('userConnected', { userId });

    client.data.roomId = roomId;
    client.data.userId = userId;

    client.on('disconnect', () => {
      const { roomId, userId } = client.data;
      client.to(roomId).emit('userDisconnected', { userId });
      if (!client.data.roomId || !client.data.userId) return;
      this.camInnerService.exitRoom(roomId, userId);

      client.leave(roomId);
      client.data.roomId = null;
      client.data.userId = null;
    });
  }

  @SubscribeMessage('updateUserStatus')
  handleUpdateUserStatus(client: Socket, payload: { status: Status }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId, userId } = client.data;
    const { status } = payload;
    this.camInnerService.updateStatus(roomId, userId, status);
    client.to(roomId).emit('userStatus', { userId, status });
  }

  @SubscribeMessage('getUserStatus')
  handleGetUserStatus(client: Socket, payload: { userId: string }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = client.data;
    const { userId } = payload;
    const status = this.camInnerService.getStatus(roomId, userId);
    const userNickname = this.camInnerService.getNickname(roomId, userId);
    if (status) {
      client.emit('userStatus', { userId, status });
    }
    if (userNickname) {
      client.emit('userNickname', { userId, userNickname });
    }
  }

  @SubscribeMessage('startScreenShare')
  handleStartScreenShare(client: Socket, payload: { roomId: string }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = payload;
    this.camInnerService.setScreenSharingUser(roomId, client.id);

    client
      .to(roomId)
      .emit('screenShareStarted', { screenSharingUserId: client.id });
  }

  @SubscribeMessage('requestScreenShare')
  handleRequestScreenShare(
    client: Socket,
    payload: { peerId: string; screenSharingUserId: string },
  ) {
    if (!client.data.roomId || !client.data.userId) return;
    const { peerId, screenSharingUserId } = payload;
    client.to(screenSharingUserId).emit('requestScreenShare', { peerId });
  }

  @SubscribeMessage('endSharingScreen')
  handleEndSharingScreen(client: Socket, payload: { roomId: string }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = payload;
    this.camInnerService.endSharingScreen(roomId);
    client.to(roomId).emit('endSharingScreen');
  }

  @SubscribeMessage('getScreenSharingUser')
  handleGetScreenSharingUser(client: Socket, payload: { roomId: string }) {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = payload;
    const screenSharingUserInfo =
      this.camInnerService.getScreenSharingUserInfo(roomId);
    if (!screenSharingUserInfo || !screenSharingUserInfo.userId) {
      return;
    }

    client.emit('getScreenSharingUser', {
      screenSharingUserId: screenSharingUserInfo.userId,
    });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: MessageInfo): void {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId } = client.data;
    const nicknameInfo = this.camInnerService.getRoomNicknameList(roomId);
    client.broadcast
      .to(roomId)
      .emit('receiveMessage', { payload, nicknameInfo });
  }

  @SubscribeMessage('changeNickname')
  handleChangeNickname(
    client: Socket,
    payload: { userNickname: string },
  ): void {
    if (!client.data.roomId || !client.data.userId) return;
    const { roomId, userId } = client.data;
    const { userNickname } = payload;

    this.camInnerService.changeNickname(roomId, client.id, userNickname);
    const nicknameInfo = this.camInnerService.getRoomNicknameList(roomId);
    client.broadcast.to(roomId).emit('getNicknameList', nicknameInfo);
    client.to(roomId).emit('userNickname', { userId, userNickname });
  }
}
