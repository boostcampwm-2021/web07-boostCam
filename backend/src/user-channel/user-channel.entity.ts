import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Server } from '../server/server.entity';
import { Channel } from '../channel/channel.entity';

@Entity()
export class UserChannel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Channel, { onDelete: 'CASCADE' })
  channel: Channel;

  @ManyToOne(() => Server, { onDelete: 'CASCADE' })
  server: Server;
}
