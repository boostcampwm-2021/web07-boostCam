import { Channel } from 'src/channel/channel.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  contents: string;

  @ManyToOne(() => Channel)
  channel: Channel;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  sender: User;
}
