import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

import { User } from '../user/user.entity';
import { Server } from './server.entity';
import RequestServerDto from './dto/RequestServerDto';
import { UserServerService } from '../user-server/user-server.service';

@Injectable()
export class ServerService {
  constructor(
    @Inject(forwardRef(() => UserServerService))
    private readonly userServerService: UserServerService,
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
    imgUrl: string | undefined,
  ): Promise<Server> {
    const newServer = new Server();
    newServer.name = requestServerDto.name;
    newServer.description = requestServerDto.description;
    newServer.owner = user;
    newServer.imgUrl = imgUrl !== undefined ? imgUrl : '';

    const createdServer = await this.serverRepository.save(newServer);
    this.userServerService.create(user, createdServer.id);

    return createdServer;
  }

  async updateServer(id: number, server: Server): Promise<void> {
    await this.serverRepository.update(id, server);
  }

  async deleteServer(id: number): Promise<void> {
    await this.serverRepository.delete({ id: id });
  }
}
