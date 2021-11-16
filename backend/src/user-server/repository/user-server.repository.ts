import { EntityRepository, Repository } from 'typeorm';
import { UserServer } from '../user-server.entity';

@EntityRepository(UserServer)
export class UserServerRepository extends Repository<UserServer> {
  getByUserIdWithServerInfo(id: number) {
    return this.createQueryBuilder('user_server')
      .leftJoinAndSelect('user_server.server', 'server')
      .where('user_server.user = :userId', { userId: id })
      .getMany();
  }
}
