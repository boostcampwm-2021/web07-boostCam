import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
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
  @JoinColumn({ referencedColumnName: 'id' })
  server: Server;
}
