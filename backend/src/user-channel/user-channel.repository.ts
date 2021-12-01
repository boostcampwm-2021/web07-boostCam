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

  getJoinedUserListByChannelId(serverId: number, channelId: number) {
    return this.createQueryBuilder('user_channel')
      .innerJoinAndSelect('user_channel.user', 'user')
      .where('user_channel.channelId = :channelId', { channelId: channelId })
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
