import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { Server } from '../server/server.entity';

@Entity()
export class Cam {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Server)
  server: Server;

  @RelationId((cam: Cam) => cam.server)
  serverId: number;
}
