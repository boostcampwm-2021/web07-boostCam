import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Server } from '../server/server.entity';

@Entity()
export class UserServer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Server)
  server: Server;
}
