import { Server } from '../server.entity';

class RequestServerDto {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  toServerEntity = () => {
    return Server.newInstance(this.name, this.description);
  };
}

export default RequestServerDto;
