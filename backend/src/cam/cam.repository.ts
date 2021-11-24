import { EntityRepository, Repository } from 'typeorm';

import { Cam } from './cam.entity';

@EntityRepository(Cam)
export class CamRepository extends Repository<Cam> {
  findByServerId(serverId: number) {
    return this.createQueryBuilder('cam')
      .where('cam.serverId = :serverId', {
        serverId,
      })
      .getMany();
  }
}
