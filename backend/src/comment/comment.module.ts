import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MessageRepository } from '../message/message.repository';
import { User } from '../user/user.entity';
import { UserServerModule } from '../user-server/user-server.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      CommentRepository,
      MessageRepository,
      User,
    ]),
    UserServerModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
