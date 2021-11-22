import { EntityRepository, Repository } from 'typeorm';
import { Server } from './server.entity';

@EntityRepository(Server)
export class ServerRepository extends Repository<Server> {
  findOneWithUsers(serverId: number) {
    return this.createQueryBuilder('server')
      .leftJoinAndSelect('server.userServer', 'user_server')
      .leftJoinAndSelect('user_server.user', 'user')
      .where('server.id = :serverId', { serverId: serverId })
      .getOne();
  }
}
