import { Server } from '../../server/server.entity';

class UserServerDto {
  id: number;
  server: Server;

  constructor(id: number, server: Server) {
    this.id = id;
    this.server = server;
  }

  static fromEntity(userServerEntity: UserServerDto) {
    return new UserServerDto(userServerEntity.id, userServerEntity.server);
  }
}

export default UserServerDto;
