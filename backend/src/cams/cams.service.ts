import { BadRequestException, Injectable } from '@nestjs/common';
import { ServerRepository } from '../server/server.repository';
import { CreateCamsDto, RequestCamsDto } from './cams.dto';
import { Cams } from './cams.entity';
import { CamsRepository } from './cams.repository';
import { v4 } from 'uuid';
import { CamService } from '../cam/cam.service';

@Injectable()
export class CamsService {
  constructor(
    private camsRepository: CamsRepository,
    private serverRepository: ServerRepository,
    private readonly camService: CamService,
  ) {}

  findOne(id: number): Promise<Cams> {
    return this.camsRepository.findOne({ id: id }, { relations: ['server'] });
  }

  async createCams(cams: CreateCamsDto): Promise<Cams> {
    const camsEntity = this.camsRepository.create();
    const server = await this.serverRepository.findOne({
      id: cams.serverId,
    });

    if (!server) {
      throw new BadRequestException();
    }

    camsEntity.name = cams.name;
    camsEntity.server = server;
    camsEntity.url = v4();

    this.camService.createRoom(camsEntity.url);
    const savedCams = await this.camsRepository.save(camsEntity);

    return savedCams;
  }

  // cam의 exitRooms 로직과 연결이 필요함!
  async deleteCams(id: number): Promise<void> {
    await this.camsRepository.delete({ id: id });
  }

  async getCams(serverId: number): Promise<RequestCamsDto[]> {
    const res = await this.camsRepository.findByServerId(serverId);
    return res.map((entry) => RequestCamsDto.fromEntry(entry.name, entry.url));
  }
}
