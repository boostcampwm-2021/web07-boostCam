import { UserServer } from 'src/user-server/user-server.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => UserServer, (userServer) => userServer.server)
  userServer: UserServer[];
}
