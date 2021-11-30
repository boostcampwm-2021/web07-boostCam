import { Injectable } from '@nestjs/common';
import { Status, CamMap } from '../types/cam';

type RoomId = string;
type SocketId = string;
type ScreenSharingUserId = SocketId;
type RoomInfo = {
  socketId: string;
  userNickname: string;
};

const MAX_PEOPLE = 5;

@Injectable()
export class CamInnerService {
  private map: Map<string, Array<CamMap>>;
  private sharedScreen: Map<RoomId, { userId: string | null }>;

  constructor() {
    this.map = new Map();
    this.sharedScreen = new Map();
  }

  getRoomNicknameList(roomId: string): RoomInfo[] {
    const roomInfo: CamMap[] = this.map.get(roomId);
    return roomInfo.map((data) => {
      const { socketId, userNickname } = data;
      return { socketId, userNickname };
    });
  }

  createRoom(roomId: string): boolean {
    if (this.map.get(roomId)) return false;
    this.map.set(roomId, []);
    this.sharedScreen.set(roomId, { userId: null });
    return true;
  }

  joinRoom(
    roomId: string,
    userId: string,
    socketId: string,
    userNickname: string,
    status: Status,
  ): boolean {
    const room = this.map.get(roomId);
    room.push({ userId, socketId, userNickname, status });
    return true;
  }

  exitRoom(roomId: string, userId: string) {
    if (!this.map.get(roomId)) return false;
    const room = this.map.get(roomId).filter((user) => user.userId !== userId);
    this.map.set(roomId, room);
  }

  updateStatus(roomId: string, userId: string, status: Status) {
    if (!this.map.get(roomId)) return false;
    const user = this.map.get(roomId).find((user) => user.userId === userId);
    user.status = status;
  }

  getStatus(roomId: string, userId: string) {
    if (!this.map.get(roomId)) return false;
    return this.map.get(roomId).find((user) => user.userId === userId)?.status;
  }

  getNickname(roomId: string, userId: string) {
    if (!this.map.get(roomId)) return false;
    return this.map.get(roomId).find((user) => user.userId === userId)
      ?.userNickname;
  }

  changeNickname(roomId: string, socketId: string, userNickname: string) {
    if (!this.map.get(roomId)) return false;
    const user = this.map
      .get(roomId)
      .find((user) => user.socketId === socketId);
    user.userNickname = userNickname;
  }

  setScreenSharingUser(roomId: RoomId, userId: ScreenSharingUserId) {
    this.sharedScreen.set(roomId, { userId });
  }

  endSharingScreen(roomId: RoomId) {
    this.sharedScreen.set(roomId, { userId: null });
  }

  getScreenSharingUserInfo(roomId: RoomId) {
    if (this.sharedScreen.has(roomId)) {
      return this.sharedScreen.get(roomId);
    }

    return null;
  }

  checkRoomAvailable(roomId: RoomId) {
    const room = this.map.get(roomId);
    return room && room.length < MAX_PEOPLE;
  }
}
