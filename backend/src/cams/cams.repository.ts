import { EntityRepository, Repository } from 'typeorm';
import { Cams } from './cams.entity';

@EntityRepository(Cams)
export class CamsRepository extends Repository<Cams> {
  findByServerId(serverId: number) {
    return this.createQueryBuilder('cams')
      .where('cams.serverId = :serverId', {
        serverId,
      })
      .getMany();
  }
}
