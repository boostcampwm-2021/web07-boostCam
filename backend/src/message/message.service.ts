import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { UserServer } from '../user-server/user-server.entity';
import { User } from '../user/user.entity';
import { MessageDto } from './message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserServer)
    private userServerRepository: Repository<UserServer>,
    @InjectRepository(Channel) private channelReposiotry: Repository<Channel>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(
    senderId: number,
    channelId: number,
    contents: string,
  ): Promise<MessageDto> {
    let newMessage;

    const userServer = await this.userServerRepository
      .createQueryBuilder('userServer')
      .innerJoin(Channel, 'channel', 'channel.serverId = userServer.serverId')
      .where('channel.id = :channelId', { channelId })
      .andWhere('userServer.userId = :senderId', { senderId })
      .getOne();

    if (!userServer) {
      throw new BadRequestException('잘못된 요청');
    }

    const sender = await this.userRepository.findOne(senderId);
    const channel = await this.channelReposiotry.findOne(channelId);

    newMessage = Message.newInstace(contents, channel, sender);
    newMessage = await this.messageRepository.save(newMessage);
    return MessageDto.fromEntity(newMessage);
  }
}
