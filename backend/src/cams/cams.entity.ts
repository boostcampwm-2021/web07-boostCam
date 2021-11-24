import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Server } from '../server/server.entity';

@Entity()
export class Cams {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Server)
  server: Server;

  @RelationId((cams: Cams) => cams.server)
  serverId: number;
}
