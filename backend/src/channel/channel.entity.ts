import { Server } from '../server/server.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Server)
  server: Server;

  @ManyToOne(() => User)
  owner: User;

  @RelationId((channel: Channel) => channel.owner)
  ownerId: number;

  static newInstance(
    name: string,
    description: string,
    server: Server,
    owner: User,
  ) {
    const newChannel = new Channel();
    newChannel.name = name;
    newChannel.description = description;
    newChannel.server = server;
    newChannel.owner = owner;
    return newChannel;
  }
}
