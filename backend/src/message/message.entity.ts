import { Channel } from '../channel/channel.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @ManyToOne(() => Channel, { onDelete: 'CASCADE' })
  channel: Channel;

  @RelationId((message: Message) => message.channel)
  channelId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  sender: User;

  static newInstace(contents: string, channel: Channel, sender: User): Message {
    const newMessage = new Message();
    newMessage.contents = contents;
    newMessage.channel = channel;
    newMessage.sender = sender;
    return newMessage;
  }
}
