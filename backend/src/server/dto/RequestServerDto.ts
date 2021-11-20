import { Server } from '../server.entity';

class RequestServerDto {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  toServerEntity = () => {
    const newServer = new Server();
    newServer.name = this.name;
    newServer.description = this.description;

    return newServer;
  };
}

export default RequestServerDto;
