import { Body, Controller, Post, Session } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { ExpressSession } from '../types/session';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('/api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async sendComment(
    @Session() session: ExpressSession,
    @Body('channelId') channelId: number,
    @Body('messageId') messageId: number,
    @Body('contents') contents: string,
  ): Promise<ResponseEntity<CommentDto>> {
    const sender = session.user;
    const newComment = await this.commentService.sendComment(
      sender.id,
      channelId,
      messageId,
      contents,
    );
    return ResponseEntity.ok(newComment);
  }
}
