import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async findByChannelId(channelId: number): Promise<Message[]> {
    return this.createQueryBuilder('message')
      .innerJoinAndSelect('message.sender', 'user')
      .where('message.channelId = :channelId', { channelId })
      .getMany();
  }
}
