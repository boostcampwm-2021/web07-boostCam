import { EntityRepository, Repository } from 'typeorm';
import { Server } from './server.entity';

@EntityRepository(Server)
export class ServerRepository extends Repository<Server> {}
