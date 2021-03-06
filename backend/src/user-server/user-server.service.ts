import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';
import { DeleteResult } from 'typeorm';
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

  async create(user: User, code: string): Promise<number> {
    const newUserServer = new UserServer();
    newUserServer.user = user;
    newUserServer.server = await this.serverService.findByCode(code);

    if (newUserServer.server == undefined) {
      throw new BadRequestException('존재하지 않는 서버입니다.');
    }
    const userServer = await this.userServerRepository.findByUserIdAndServerId(
      user.id,
      newUserServer.server.id,
    );
    if (userServer !== undefined) {
      throw new BadRequestException('이미 등록된 서버입니다.');
    }

    const newUserServerId = await this.userServerRepository.save(newUserServer);
    return newUserServerId.id;
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

  async getServerListByUserId(userId: number): Promise<UserServerDto[]> {
    const userServerList =
      await this.userServerRepository.getServerListByUserId(userId);
    userServerList.map(UserServerDto.fromEntity);
    return userServerList;
  }

  async checkUserChannelAccess(senderId: number, channelId: number) {
    const userServer = await this.userCanAccessChannel(senderId, channelId);

    if (!userServer) {
      throw new ForbiddenException('서버나 채널에 참여하지 않았습니다.');
    }
  }

  private async userCanAccessChannel(userId: number, channelId: number) {
    return await this.userServerRepository.userCanAccessChannel(
      userId,
      channelId,
    );
  }
}
