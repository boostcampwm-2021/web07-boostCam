export type CreateCamsDto = {
  name: string;
  serverId: number;
};

export class RequestCamsDto {
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  static fromEntry(name: string, url: string) {
    return new RequestCamsDto(name, url);
  }
}
