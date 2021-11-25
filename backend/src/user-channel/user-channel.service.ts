import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { UserChannelRepository } from './user-channel.repository';
import { UserChannel } from './user-channel.entity';
import { Channel } from '../channel/channel.entity';
import { UserRepository } from '../user/user.repository';

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
    return this.userChannelRepository.delete({ channelId: id });
  }

  getJoinedChannelListByUserId(
    serverId: number,
    userId: number,
  ): Promise<UserChannel[]> {
    return this.userChannelRepository.getJoinedChannelListByUserId(
      userId,
      serverId,
    );
  }

  async getNotJoinedChannelListByUserId(
    serverId: number,
    userId: number,
  ): Promise<UserChannel[]> {
    const allList = await this.userChannelRepository.getAllList(serverId);
    const joinedList =
      await this.userChannelRepository.getJoinedChannelListByUserId(
        userId,
        serverId,
      );
    const joinedChannelList = joinedList.map(
      (userChannel) => userChannel.channel.id,
    );

    const notJoinedList = allList.filter(
      (userChannel) => !joinedChannelList.includes(userChannel.channel.id),
    );

    return notJoinedList;
  }

  async deleteByUserIdAndChannelId(userId: number, channelId: number) {
    const res =
      await this.userChannelRepository.getUserChannelByUserIdAndChannelId(
        userId,
        channelId,
      );
    this.userChannelRepository.delete({ id: res.id });
  }

  async findChannelsByUserId(userId: number) {
    const userChannels = await this.userChannelRepository
      .createQueryBuilder('user_channel')
      .where('user_channel.user = :userId', { userId: userId })
      .getMany();
    return userChannels.map((uc) => uc.channelId.toString());
  }
}
