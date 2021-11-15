import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Server } from './server.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  githubId: number;

  @Column()
  nickname: string;

  @Column()
  profile: string;

  @ManyToMany((type) => Server)
  @JoinTable()
  servers: Server[];
}
