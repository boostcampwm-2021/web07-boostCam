import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteQueryBuilder, DeleteResult } from 'typeorm';

import { UserChannelRepository } from './user-channel.repository';
import { UserChannel } from './user-channel.entity';
import { User } from 'src/user/user.entity';
import { Channel } from 'src/channel/channel.entity';
import { UserRepository } from 'src/user/user.repository';
import { ChannelRepository } from 'src/channel/user.repository';

@Injectable()
export class UserChannelService {
  constructor(
    @InjectRepository(UserChannelRepository)
    private userChannelRepository: UserChannelRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
  ) {
    this.userChannelRepository = userChannelRepository;
    this.userRepository = userRepository;
    this.channelRepository = channelRepository;
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

  getJoinedChannelListByUserId(
    serverId: number,
    userId: number,
  ): Promise<UserChannel[]> {
    console.log(serverId, userId);
    return this.userChannelRepository.getJoinedChannelListByUserId(
      userId,
      serverId,
    );
  }

  async getNotJoinedChannelListByUserId(
    serverId: number,
    userId: number,
  ): Promise<Channel[]> {
    const allList = await this.channelRepository.getAllList();
    const joinedList =
      await this.userChannelRepository.getJoinedChannelListByUserId(
        userId,
        serverId,
      );
    const joinedChannelList = joinedList.map(
      (userChannel) => userChannel.channel.id,
    );

    const notJoinedList = allList.filter(
      (channel) => !joinedChannelList.includes(channel.id),
    );

    return notJoinedList;
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
}
