import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Server {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  owner: User;
}
