import { Injectable } from '@nestjs/common';
import Status from 'src/types/cam';

@Injectable()
export class CamService {
  private map: Map<string, Array<{ userId: string; status: Status }>>;
  constructor() {
    this.map = new Map();
  }
  showMap() {
    return this.map;
  }
  isRoomExist(roomId: string): boolean {
    return this.map.has(roomId) ? true : false;
  }
  createRoom(roomId: string): boolean {
    if (this.map.get(roomId)) return false;
    this.map.set(roomId, []);
    return true;
  }
  joinRoom(roomId: string, userId: string, status: Status): boolean {
    if (!this.map.get(roomId)) return false;
    this.map.get(roomId).push({ userId, status });
    return true;
  }
  exitRoom(roomId: string, userId: string) {
    const room = this.map.get(roomId).filter((user) => user.userId !== userId);
    this.map.set(roomId, room);
  }
  updateStatus(roomId: string, userId: string, status: Status) {
    const user = this.map.get(roomId).find((user) => user.userId === userId);
    user.status = status;
  }
  getStatus(roomId: string, userId: string) {
    return this.map.get(roomId).find((user) => user.userId === userId).status;
  }
}
