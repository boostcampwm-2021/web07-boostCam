import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChannelRepository } from './user-channel.repository';
import { UserChannel } from './user-channel.entity';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';

@Injectable()
export class UserChannelService {
  constructor(
    @InjectRepository(UserChannelRepository)
    private userChannelRepository: UserChannelRepository,
  ) {}

  create(userChannel: UserChannel): Promise<UserChannel> {
    return this.userChannelRepository.save(userChannel);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.userChannelRepository.delete(id);
  }

  deleteByUserIdAndChannelId(
    userId: number,
    serverId: number,
  ): DeleteQueryBuilder<UserChannel> {
    return this.userChannelRepository.deleteByUserIdAndChannelId(
      userId,
      serverId,
    );
  }

  getJoinedChannelListByUserId(
    userId: number,
    serverId: number,
  ): Promise<UserChannel[]> {
    return this.userChannelRepository.getJoinedChannelListByUserId(
      userId,
      serverId,
    );
  }

  getNotJoinedChannelListByUserId(
    userId: number,
    serverId: number,
  ): Promise<UserChannel[]> {
    return this.userChannelRepository.getNotJoinedChannelListByUserId(
      userId,
      serverId,
    );
  }
}
