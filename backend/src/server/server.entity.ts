import { UserServer } from '../user-server/user-server.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  RelationId,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column()
  code: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  owner: User;

  @RelationId((server: Server) => server.owner)
  ownerId: number;

  @OneToMany(() => UserServer, (userServer) => userServer.server)
  userServer: UserServer[];

  static newInstance(description: string, name: string): Server {
    const server = new Server();
    server.description = description;
    server.name = name;
    return server;
  }
}
