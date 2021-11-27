import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { ChannelFormDto } from './channel.dto';
import { Channel } from './channel.entity';
import { Server } from '../server/server.entity';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';

@Injectable()
export class ChannelService {
  /** * 생성자 */ constructor(
    @InjectRepository(Channel) private channelRepository: ChannelRepository,
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Server) private serverRepository: Repository<Server>,
  ) {}
  findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }
  findOne(id: number): Promise<Channel> {
    return this.channelRepository.findOne(
      { id: id },
      { relations: ['server'] },
    );
  }
  async createChannel(
    channel: ChannelFormDto,
    userId: number,
  ): Promise<Channel> {
    const channelEntity = await this.createChannelEntity(channel, userId);
    const savedChannel = await this.channelRepository.save(channelEntity);

    return savedChannel;
  }

  async updateChannel(
    id: number,
    channel: ChannelFormDto,
    userId: number,
  ): Promise<Channel> {
    const channelEntity = await this.createChannelEntity(channel, userId);
    await this.channelRepository.update(id, channelEntity);
    return channelEntity;
  }

  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete({ id: id });
  }

  async createChannelEntity(
    channel: ChannelFormDto,
    userId: number,
  ): Promise<Channel> {
    const { name, description, serverId } = channel;
    const server = await this.serverRepository.findOne({
      id: serverId,
    });
    const user = await this.userRepository.findOne({
      id: userId,
    });

    if (!server) throw new NotFoundException('서버가 존재하지 않습니다!');
    if (!user) throw new NotFoundException('사용자가 존재하지 않습니다!');

    const newChannel = Channel.newInstance(name, description, server, user);
    return newChannel;
  }
}
