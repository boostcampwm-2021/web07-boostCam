import { EntityRepository, Repository } from 'typeorm';
import { Channel } from './channel.entity';

@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  getAllList() {
    return this.createQueryBuilder('channel').getMany();
  }
}
