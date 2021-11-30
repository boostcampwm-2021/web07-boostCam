import { Controller, Get, Query } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { CommentService } from './comment.service';

@Controller('/api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async findCommentsByMessageId(@Query('messageId') messageId: number) {
    const comments = await this.commentService.findCommentsByMessageId(
      messageId,
    );
    return ResponseEntity.ok(comments);
  }
}
