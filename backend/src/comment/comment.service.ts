import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRepository } from '../message/message.repository';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private messageRepository: MessageRepository,
    private readonly userServerService: UserServerService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async sendComment(
    senderId: number,
    channelId: number,
    messageId: number,
    contents: string,
  ): Promise<CommentDto> {
    const sender = await this.userRepository.findOne(senderId);
    const message = await this.messageRepository.findOne(messageId);

    if (!message) {
      throw new NotFoundException('메시지가 존재하지 않습니다.');
    }

    await this.userServerService.checkUserChannelAccess(senderId, channelId);

    const newComment = await this.commentRepository.save(
      Comment.newInstance(sender, message, contents),
    );

    return CommentDto.fromEntity(newComment);
  }
}
