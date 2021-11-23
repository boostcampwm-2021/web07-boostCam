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
import UserServerDto from './dto/user-server-list.dto';

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

  async deleteById(id: number, userId: number): Promise<DeleteResult> {
    const userServer = await this.userServerRepository.findWithServerOwner(id);

    if (!userServer) {
      throw new BadRequestException('해당 서버에 참가하고 있지 않습니다.');
    }
    if (userServer.server.owner.id === userId) {
      throw new BadRequestException('서버 생성자는 서버에서 나갈 수 없습니다.');
    }

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

  async getServerListByUserId(userId: number): Promise<UserServerDto[]> {
    const userServerDtoList = [];

    const userServerList =
      await this.userServerRepository.getServerListByUserId(userId);
    userServerList.map((userServer) => {
      userServerDtoList.push(UserServerDto.fromEntity(userServer));
    });

    return userServerDtoList;
  }
}
