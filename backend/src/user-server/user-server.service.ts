import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';

@Injectable()
export class UserServerService {
  constructor(
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  create(userServer: UserServer): Promise<UserServer> {
    return this.userServerRepository.save(userServer);
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
}
