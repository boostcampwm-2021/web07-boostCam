import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { User } from '../user/user.entity';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Channel) private channelReposiotry: Repository<Channel>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(
    senderId: number,
    channelId: number,
    contents: string,
  ): Promise<Message> {
    let newMessage;
    const sender = await this.userRepository.findOne(senderId);
    const channel = await this.channelReposiotry.findOne(channelId);

    if (!channel) {
      throw new NotFoundException('채널이 존재하지 않습니다.');
    }

    newMessage = Message.newInstace(contents, channel, sender);
    newMessage = await this.messageRepository.save(newMessage);
    return newMessage;
  }
}
