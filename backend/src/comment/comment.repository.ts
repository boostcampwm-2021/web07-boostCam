import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async findByMessageId(messageId: number): Promise<Comment[]> {
    return this.createQueryBuilder('comment')
      .innerJoinAndSelect('comment.sender', 'user')
      .where('comment.messageId = :messageId', { messageId })
      .orderBy('comment.id')
      .getMany();
  }
}
