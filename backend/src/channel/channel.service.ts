import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChannel } from 'src/user-channel/user-channel.entity';
import { UserChannelRepository } from 'src/user-channel/user-channel.repository';
import { Repository } from 'typeorm/index';

import { Channel } from './channel.entity';
import { User } from 'src/user/user.entity';
import { CreateChannelDto } from './channe.dto';
import { Server } from 'src/server/server.entity';

@Injectable()
export class ChannelService {
  /** * 생성자 */ constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Server) private serverRepository: Repository<Server>,
    @InjectRepository(UserChannelRepository)
    private userChannelRepository: UserChannelRepository,
  ) {
    this.channelRepository = channelRepository;
  }
  findAll(): Promise<Channel[]> {
    return this.channelRepository.find({ relations: ['server'] });
  }
  findOne(id: number): Promise<Channel> {
    return this.channelRepository.findOne({ id: id });
  }
  async addChannel(
    channel: CreateChannelDto,
    userId: number,
  ): Promise<Channel> {
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
    const user = await this.userRepository.findOne({ id: userId });
    const userChannel = this.userChannelRepository.create();
    userChannel.channel = savedChannel;
    userChannel.server = server;
    userChannel.user = user;
    await this.userChannelRepository.save(userChannel);
    return savedChannel;
  }
  async updateChannel(id: number, channel: Channel): Promise<void> {
    await this.channelRepository.update(id, channel);
  }
  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete({ id: id });
  }
}
