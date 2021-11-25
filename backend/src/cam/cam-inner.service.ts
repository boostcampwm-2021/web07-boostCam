import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Status, CamMap } from '../types/cam';
import { CamService } from './cam.service';

type RoomId = string;
type SocketId = string;
type ScreenSharingUserId = SocketId;
type RoomInfo = {
  socketId: string;
  userNickname: string;
};

@Injectable()
export class CamInnerService {
  private map: Map<string, Array<CamMap>>;
  private sharedScreen: Map<RoomId, { userId: string | null }>;

  constructor(
    @Inject(forwardRef(() => CamService))
    private readonly camService: CamService,
  ) {
    this.map = new Map();
    this.sharedScreen = new Map();
  }

  getRoomList() {
    return this.map;
  }

  getRoomNicknameList(roomId: string): RoomInfo[] {
    const roomInfo: CamMap[] = this.map.get(roomId);
    return roomInfo.map((data) => {
      const { socketId, userNickname } = data;
      return { socketId, userNickname };
    });
  }

  isRoomExist(roomId: string): boolean {
    return this.map.has(roomId);
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
    if (!this.map.get(roomId)) return false;
    this.map.get(roomId).push({ userId, socketId, userNickname, status });
    return true;
  }

  exitRoom(roomId: string, userId: string) {
    if (!this.map.get(roomId)) return false;
    const room = this.map.get(roomId).filter((user) => user.userId !== userId);
    if (room.length == 0) {
      this.map.delete(roomId);
      this.camService.deleteCam(roomId);
    } else {
      this.map.set(roomId, room);
    }
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
}
