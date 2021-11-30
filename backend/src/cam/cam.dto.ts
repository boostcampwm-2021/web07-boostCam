import { Cam } from './cam.entity';

export type RequestCamDto = {
  name: string;
  serverId: number;
  userId: number | null;
};

export class ResponseCamDto {
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  static fromEntry(cam: Cam) {
    return new ResponseCamDto(cam.name, cam.url);
  }
}
