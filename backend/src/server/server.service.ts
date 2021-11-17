import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { Server } from './server.entity';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server) private serverRepository: Repository<Server>,
  ) {
    this.serverRepository = serverRepository;
  }
  findAll(): Promise<Server[]> {
    return this.serverRepository.find({ relations: ['owner'] });
  }
  findOne(id: number): Promise<Server> {
    return this.serverRepository.findOne({ id: id });
  }
  async addServer(server: Server): Promise<void> {
    await this.serverRepository.save(server);
  }
  async updateServer(id: number, server: Server): Promise<void> {
    await this.serverRepository.update(id, server);
  }
  async deleteServer(id: number): Promise<void> {
    await this.serverRepository.delete({ id: id });
  }
}
