import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerRepository } from '../repository/server.repository';
import { Server } from '../server.entity';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerRepository)
    private serverRepository: ServerRepository,
  ) {}

  getByServerId(serverId: number): Promise<Server> {
    return this.serverRepository.findOne({ id: serverId });
  }
}
