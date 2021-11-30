import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import ResponseEntity from '../common/response-entity';
import { CommentDto } from './comment.dto';
import { commentDtoSchema } from './comment.schema';
import { CommentService } from './comment.service';

@Controller('/api/comments')
@ApiExtraModels(ResponseEntity)
@ApiExtraModels(CommentDto)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOkResponse(commentDtoSchema)
  @Get()
  async findCommentsByMessageId(@Query('messageId') messageId: number) {
    const comments = await this.commentService.findCommentsByMessageId(
      messageId,
    );
    return ResponseEntity.ok(comments);
  }
}
