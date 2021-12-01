import { Cam } from './cam.entity';

export type RequestCamDto = {
  name: string;
  serverId: number;
  userId: number | null;
};

export class ResponseCamDto {
  id: number;
  name: string;
  url: string;
  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
  }

  static fromEntry(cam: Cam) {
    return new ResponseCamDto(cam.id, cam.name, cam.url);
  }
}
