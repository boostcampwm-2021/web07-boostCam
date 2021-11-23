import { Server } from '../../server/server.entity';

class UserServerListDto {
  id: number;
  server: Server;

  constructor(id: number, server: Server) {
    this.id = id;
    this.server = server;
  }
}

export default UserServerListDto;
