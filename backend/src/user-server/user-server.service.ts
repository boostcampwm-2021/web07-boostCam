import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';
import { User } from '../user/user.entity';
import { ServerService } from '../server/server.service';

@Injectable()
export class UserServerService {
  constructor(
    @Inject(forwardRef(() => ServerService))
    private readonly serverService: ServerService,
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  async create(user: User, serverId: number): Promise<UserServer> {
    const newUserServer = new UserServer();
    newUserServer.user = user;
    newUserServer.server = await this.serverService.findOne(serverId);

    if (newUserServer.server == undefined) {
      throw new BadRequestException('존재하지 않는 서버입니다.');
    }
    const userServer = await this.userServerRepository.findByUserIdAndServerId(
      user.id,
      serverId,
    );
    if (userServer !== undefined) {
      throw new BadRequestException('이미 등록된 서버입니다.');
    }

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
