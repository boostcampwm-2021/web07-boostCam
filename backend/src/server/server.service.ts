import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Server } from './server.entity';
import RequestServerDto from './dto/request-server.dto';
import { UserServerService } from '../user-server/user-server.service';
import { ServerRepository } from './server.repository';
import ServerWithUsersDto from './dto/response-server-users.dto';

@Injectable()
export class ServerService {
  constructor(
    @Inject(forwardRef(() => UserServerService))
    private readonly userServerService: UserServerService,
    @InjectRepository(ServerRepository)
    private serverRepository: ServerRepository,
  ) {}
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
    const server = requestServerDto.toServerEntity();
    server.owner = user;
    server.imgUrl = imgUrl || '';

    const createdServer = await this.serverRepository.save(server);
    this.userServerService.create(user, createdServer.id);

    return createdServer;
  }

  async updateServer(
    id: number,
    requestServer: RequestServerDto,
    user: User,
    imgUrl: string | undefined,
  ): Promise<void> {
    const server = await this.serverRepository.findOneWithOwner(id);

    if (server.owner.id !== user.id) {
      throw new ForbiddenException('변경 권한이 없습니다.');
    }

    const newServer = requestServer.toServerEntity();

    newServer.imgUrl = imgUrl || server.imgUrl;
    newServer.name = newServer.name || server.name;
    newServer.description = newServer.description || server.description;

    this.serverRepository.update(id, newServer);
  }

  async deleteServer(id: number, user: User) {
    const server = await this.serverRepository.findOneWithOwner(id);

    if (!server) {
      throw new BadRequestException('존재하지 않는 서버입니다.');
    }
    if (server.owner.id !== user.id) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.serverRepository.delete({ id: id });
  }

  async findOneWithUsers(serverId: number): Promise<ServerWithUsersDto> {
    const serverWithUsers = await this.serverRepository.findOneWithUsers(
      serverId,
    );

    return ServerWithUsersDto.fromEntity(serverWithUsers);
  }
}
