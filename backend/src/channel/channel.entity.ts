import { Server } from '../server/server.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UserChannel } from '../user-channel/user-channel.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Server, { onDelete: 'CASCADE' })
  server: Server;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => UserChannel, (userChannels) => userChannels.channel)
  userChannels: UserChannel[];

  @RelationId((channel: Channel) => channel.owner)
  ownerId: number;

  @RelationId((channel: Channel) => channel.server)
  serverId: number;

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
