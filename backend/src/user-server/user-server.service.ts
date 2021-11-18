import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';
import { User } from '../user/user.entity';
import { Server } from '../server/server.entity';

@Injectable()
export class UserServerService {
  constructor(
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  async create(user: User, server: Server): Promise<UserServer> {
    const newUserServer = new UserServer();
    newUserServer.user = user;
    newUserServer.server = server;
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
