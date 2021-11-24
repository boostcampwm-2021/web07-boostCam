import { EntityRepository, Repository } from 'typeorm';
import { Cams } from './cams.entity';

@EntityRepository(Cams)
export class CamsRepository extends Repository<Cams> {
  findWithServerId(serverId: number) {
    return this.find({
      where: { server: { id: serverId } },
      relations: ['server'],
    });
  }
}
