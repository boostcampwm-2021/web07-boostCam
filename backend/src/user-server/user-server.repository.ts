import { EntityRepository, Repository } from 'typeorm';
import { UserServer } from './user-server.entity';

@EntityRepository(UserServer)
export class UserServerRepository extends Repository<UserServer> {
  getServerListByUserId(userId: number) {
    return this.createQueryBuilder('user_server')
      .leftJoinAndSelect('user_server.server', 'server')
      .where('user_server.user = :userId', { userId: userId })
      .getMany();
  }

  deleteByUserIdAndServerId(userId: number, serverId: number) {
    return this.createQueryBuilder('user_server')
      .where('user_server.user = :userId', { userId: userId })
      .andWhere('user_server.server = :serverId', { serverId: serverId })
      .delete();
  }
}
