export type CreateCamDto = {
  name: string;
  serverId: number;
};

export class ResponseCamDto {
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  static fromEntry(name: string, url: string) {
    return new ResponseCamDto(name, url);
  }
}
