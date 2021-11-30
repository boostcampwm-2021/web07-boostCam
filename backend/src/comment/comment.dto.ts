import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';
import { Comment } from './comment.entity';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  contents: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  sender: UserDto;

  @ApiProperty()
  messageId: number;

  static newInstance(
    id: number,
    contents: string,
    createdAt: Date,
    sender: UserDto,
    messageId: number,
  ) {
    const newInstance = new CommentDto();
    newInstance.id = id;
    newInstance.contents = contents;
    newInstance.createdAt = createdAt;
    newInstance.sender = sender;
    newInstance.messageId = messageId;
    return newInstance;
  }

  static fromEntity(comment: Comment) {
    return CommentDto.newInstance(
      comment.id,
      comment.contents,
      comment.createdAt,
      UserDto.fromEntity(comment.sender),
      comment.messageId,
    );
  }
}
