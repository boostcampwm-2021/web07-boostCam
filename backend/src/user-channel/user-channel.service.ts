import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';

import { UserChannelRepository } from './user-channel.repository';
import { UserChannel } from './user-channel.entity';
import { User } from 'src/user/user.entity';
import { Channel } from 'src/channel/channel.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserChannelService {
  constructor(
    @InjectRepository(UserChannelRepository)
    private userChannelRepository: UserChannelRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    this.userChannelRepository = userChannelRepository;
    this.userRepository = userRepository;
  }

  async addNewChannel(channel: Channel, userId: number): Promise<UserChannel> {
    const user = await this.userRepository.findOne({ id: userId });
    const userChannel = this.userChannelRepository.create();
    userChannel.channel = channel;
    userChannel.server = channel.server;
    userChannel.user = user;
    return await this.userChannelRepository.save(userChannel);
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
