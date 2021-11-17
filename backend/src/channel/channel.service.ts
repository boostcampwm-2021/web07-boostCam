import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { Channel } from './channel.entity';

@Injectable()
export class ChannelService {
  /** * 생성자 */ constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {
    this.channelRepository = channelRepository;
  }
  findAll(): Promise<Channel[]> {
    return this.channelRepository.find({ relations: ['server'] });
  }
  findOne(id: number): Promise<Channel> {
    return this.channelRepository.findOne({ id: id });
  }
  async addChannel(channel: Channel): Promise<void> {
    await this.channelRepository.save(channel);
  }
  async updateChannel(id: number, channel: Channel): Promise<void> {
    await this.channelRepository.update(id, channel);
  }
  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete({ id: id });
  }
}
