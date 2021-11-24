import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import { MessageDto } from './message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userServerService: UserServerService,
    @InjectRepository(Channel) private channelReposiotry: Repository<Channel>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(
    senderId: number,
    channelId: number,
    contents: string,
  ): Promise<MessageDto> {
    let newMessage;

    const userServer = await this.userServerService.userCanAccessChannel(
      senderId,
      channelId,
    );

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
