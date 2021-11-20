import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm/index';
import RequestServerDto from './dto/RequestServerDto';

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

  async create(
    user: User,
    requestServerDto: RequestServerDto,
  ): Promise<Server> {
    const newServer = requestServerDto.toServerEntity();
    newServer.owner = user;

    return this.serverRepository.save(newServer);
  }

  async updateServer(id: number, server: Server): Promise<void> {
    await this.serverRepository.update(id, server);
  }

  async deleteServer(id: number): Promise<void> {
    await this.serverRepository.delete({ id: id });
  }
}
