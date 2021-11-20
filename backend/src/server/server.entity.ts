import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Server {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  owner: User;
}
