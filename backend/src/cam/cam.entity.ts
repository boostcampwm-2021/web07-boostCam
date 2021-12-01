import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { Server } from '../server/server.entity';
import { User } from '../user/user.entity';

@Entity()
export class Cam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Server, { onDelete: 'CASCADE' })
  server: Server;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @RelationId((cam: Cam) => cam.server)
  serverId: number;

  @RelationId((cam: Cam) => cam.owner)
  ownerId: number;
}
