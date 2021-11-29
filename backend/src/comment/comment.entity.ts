import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  RelationId,
} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  sender: User;

  @RelationId((comment: Comment) => comment.sender)
  senderId: number;

  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  message: Message;

  @RelationId((comment: Comment) => comment.message)
  messageId: number;

  static newInstance(sender: User, message: Message, contents: string) {
    const newInstance = new Comment();
    newInstance.contents = contents;
    newInstance.sender = sender;
    newInstance.message = message;
    return newInstance;
  }
}
