import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Channel } from './channel.entity';

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  getAllList() {
    return this.createQueryBuilder('channel').getMany();
  }

  getChannelListByServerId(serverId: number) {
    return this.createQueryBuilder('channel')
      .where('channel.serverId = :serverId', { serverId })
      .getMany();
  }

  getJoinedChannelList(userId: number, serverId: number) {
    return this.createQueryBuilder('channel')
      .leftJoin('channel.userChannels', 'user_channel')
      .where('channel.serverId = :serverId', { serverId })
      .andWhere('user_channel.userId = :userId', { userId })
      .getMany();
  }

  getNotJoinedChannelList(userId: number, serverId: number) {
    return this.createQueryBuilder('channel')
      .leftJoin('channel.userChannels', 'user_channel')
      .where('channel.serverId = :serverId', { serverId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user_channel.userId != :userId', { userId }).orWhere(
            'user_channel.userId IS NULL',
          );
        }),
      )
      .getMany();
  }
}
