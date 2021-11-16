import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerService } from 'src/server/service/server.service';
import { UserService } from 'src/user/service/user.service';
import { UserServerRepository } from '../repository/user-server.repository';
import { UserServer } from '../user-server.entity';

@Injectable()
export class UserServerService {
  constructor(
    private serverService: ServerService,
    private userService: UserService,
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  getByUserIdWithServerInfo(userId: number): Promise<UserServer[]> {
    return this.userServerRepository.getByUserIdWithServerInfo(userId);
  }

  async create(userId: number, serverId: number): Promise<UserServer> {
    const user = await this.userService.getByUserId(userId);
    const server = await this.serverService.getByServerId(serverId);
    const userServer = new UserServer();
    userServer.server = server;
    userServer.user = user;

    return this.userServerRepository.save(userServer);
  }
}
