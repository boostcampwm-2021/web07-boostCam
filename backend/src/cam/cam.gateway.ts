import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Status, MessageInfo, CamMap } from 'src/types/cam';
import { CamService } from './cam.service';

type RoomInfo = {
  socketId: string;
  userNickname: string;
};

@WebSocketGateway()
export class CamGateway {
  constructor(private camService: CamService) {
    this.camService.createRoom('1');
  }

  handleConnection(client: Socket) {
    console.log(`${client.id} is connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} is disconnected!`);
  }

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
    this.camService.joinRoom(roomId, userId, client.id, userNickname, status);
    client.to(roomId).emit('userConnected', { userId });

    client.data.roomId = roomId;
    client.data.userId = userId;

    client.on('disconnect', () => {
      client.to(roomId).emit('userDisconnected', { userId });
      this.camService.exitRoom(roomId, userId);
    });

    console.log(this.camService.getRoomList());
  }

  @SubscribeMessage('exitRoom')
  handleExitRoom(client: Socket): void {
    const { roomId, userId } = client.data;
    client.to(roomId).emit('userDisconnected', { userId });
    client.leave(roomId);
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

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: MessageInfo): void {
    const { roomId } = client.data;
    const roomInfo: CamMap[] = this.camService.getRoomInfobyRoomId(roomId);
    const nicknameInfo: RoomInfo[] = roomInfo.map((data) => {
      const { socketId, userNickname } = data;
      return { socketId, userNickname };
    });
    client.broadcast
      .to(roomId)
      .emit('receiveMessage', { payload, nicknameInfo });
  }

  @SubscribeMessage('changeNickname')
  handleChangeNickname(
    client: Socket,
    payload: { userNickname: string },
  ): void {
    const { roomId } = client.data;
    const { userNickname } = payload;
    this.camService.changeNickname(roomId, client.id, userNickname);
    const roomInfo: CamMap[] = this.camService.getRoomInfobyRoomId(roomId);
    const nicknameInfo: RoomInfo[] = roomInfo.map((data) => {
      const { socketId, userNickname } = data;
      return { socketId, userNickname };
    });
    client.broadcast.to(roomId).emit('getNicknameList', nicknameInfo);
  }
}
