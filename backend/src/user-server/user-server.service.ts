import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';
import { User } from '../user/user.entity';
import { Server } from '../server/server.entity';
import { ServerService } from 'src/server/server.service';

@Injectable()
export class UserServerService {
  constructor(
    private serverService: ServerService,
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  async create(user: User, serverId: number): Promise<UserServer> {
    const newUserServer = new UserServer();
    newUserServer.user = user;
    newUserServer.server = await this.serverService.findOne(serverId);
    return this.userServerRepository.save(newUserServer);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.userServerRepository.delete(id);
  }

  deleteByUserIdAndServerId(
    userId: number,
    serverId: number,
  ): DeleteQueryBuilder<UserServer> {
    return this.userServerRepository.deleteByUserIdAndServerId(
      userId,
      serverId,
    );
  }

  getServerListByUserId(userId: number): Promise<UserServer[]> {
    return this.userServerRepository.getServerListByUserId(userId);
  }
}
