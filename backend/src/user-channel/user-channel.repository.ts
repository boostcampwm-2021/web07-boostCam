import { EntityRepository, Repository, getConnection } from 'typeorm';
import { UserChannel } from './user-channel.entity';

@EntityRepository(UserChannel)
export class UserChannelRepository extends Repository<UserChannel> {
  getJoinedChannelListByUserId(userId: number, serverId: number) {
    return this.createQueryBuilder('user_channel')
      .where('user_channel.user = :userId', { userId: userId })
      .andWhere('user_channel.server = :serverId', { serverId: serverId })
      .getMany();
  }

  getNotJoinedChannelListByUserId(userId: number, serverId: number) {
    return this.createQueryBuilder('user_channel')
      .where('user_channel.user != :userId', { userId: userId })
      .andWhere('user_channel.server = :serverId', { serverId: serverId })
      .getMany();
  }

  deleteByUserIdAndChannelId(userId: number, channelId: number) {
    return this.createQueryBuilder('user_channel')
      .where('user_channel.user = :userId', { userId: userId })
      .andWhere('user_channel.channelId = :channelId', { channelId: channelId })
      .delete();
  }
}
