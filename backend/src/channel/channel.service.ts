import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { CreateChannelDto } from './channe.dto';
import { Channel } from './channel.entity';
import { Server } from '../server/server.entity';
import { ChannelRepository } from './user.repository';

@Injectable()
export class ChannelService {
  /** * 생성자 */ constructor(
    @InjectRepository(Channel) private channelRepository: ChannelRepository,
    @InjectRepository(Server) private serverRepository: Repository<Server>,
  ) {
    this.channelRepository = channelRepository;
    this.serverRepository = serverRepository;
  }
  findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }
  findOne(id: number): Promise<Channel> {
    return this.channelRepository.findOne(
      { id: id },
      { relations: ['server'] },
    );
  }
  async addChannel(channel: CreateChannelDto): Promise<Channel> {
    const channelEntity = this.channelRepository.create();
    const server = await this.serverRepository.findOne({
      id: channel.serverId,
    });

    if (!server) {
      throw new BadRequestException();
    }

    channelEntity.name = channel.name;
    channelEntity.description = channel.description;
    channelEntity.server = server;

    const savedChannel = await this.channelRepository.save(channelEntity);

    return savedChannel;
  }
  async updateChannel(id: number, channel: Channel): Promise<void> {
    await this.channelRepository.update(id, channel);
  }
  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete({ id: id });
  }
}
