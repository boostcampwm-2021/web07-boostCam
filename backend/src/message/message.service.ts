import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import { MessageDto } from './message.dto';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Channel) private channelReposiotry: Repository<Channel>,
    private readonly userServerService: UserServerService,
    private messageRepository: MessageRepository,
  ) {}

  async sendMessage(
    senderId: number,
    channelId: number,
    contents: string,
  ): Promise<MessageDto> {
    await this.checkUserChannelAccess(senderId, channelId);

    const sender = await this.userRepository.findOne(senderId);
    const channel = await this.channelReposiotry.findOne(channelId);

    const newMessage = await this.messageRepository.save(
      Message.newInstace(contents, channel, sender),
    );
    return MessageDto.fromEntity(newMessage);
  }

  async findMessagesByChannelId(senderId: number, channelId: number) {
    await this.checkUserChannelAccess(senderId, channelId);
    const messages = await this.messageRepository.findByChannelId(channelId);
    return messages.map(MessageDto.fromEntity);
  }

  private async checkUserChannelAccess(senderId: number, channelId: number) {
    const userServer = await this.userServerService.userCanAccessChannel(
      senderId,
      channelId,
    );

    if (!userServer) {
      throw new ForbiddenException('서버나 채널에 참여하지 않았습니다.');
    }
  }
}
