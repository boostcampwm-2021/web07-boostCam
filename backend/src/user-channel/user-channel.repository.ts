import { EntityRepository, Repository } from 'typeorm';
import { UserChannel } from './user-channel.entity';

@EntityRepository(UserChannel)
export class UserChannelRepository extends Repository<UserChannel> {
  getAllList(serverId: number) {
    return this.createQueryBuilder('user_channel')
      .leftJoinAndSelect('user_channel.channel', 'channel')
      .where('user_channel.server = :serverId', { serverId: serverId })
      .getMany();
  }

  getUserChannelListByUserId(userId: number) {
    return this.createQueryBuilder('user_channel')
      .where('user_channel.user = :userId', { userId: userId })
      .getMany();
  }

  getJoinedChannelListByUserId(userId: number, serverId: number) {
    return this.createQueryBuilder('user_channel')
      .leftJoinAndSelect('user_channel.channel', 'channel')
      .where('user_channel.user = :userId', { userId: userId })
      .andWhere('user_channel.server = :serverId', { serverId: serverId })
      .getMany();
  }

  getUserChannelByUserIdAndChannelId(userId: number, channelId: number) {
    return this.createQueryBuilder('user_channel')
      .where('user_channel.user = :userId', { userId: userId })
      .andWhere('user_channel.channelId = :channelId', {
        channelId: channelId,
      })
      .getOne();
  }
}
