import { BadRequestException, Injectable } from '@nestjs/common';
import { ServerRepository } from '../server/server.repository';
import { CreateCamDto, ResponseCamDto } from './cam.dto';
import { Cam } from './cam.entity';
import { CamRepository } from './cam.repository';
import { v4 } from 'uuid';
import { CamInnerService } from './cam-inner.service';

@Injectable()
export class CamService {
  constructor(
    private camRepository: CamRepository,
    private serverRepository: ServerRepository,
    private readonly camInnerService: CamInnerService,
  ) {}

  findOne(id: number): Promise<Cam> {
    return this.camRepository.findOne({ id: id }, { relations: ['server'] });
  }

  async createCam(cam: CreateCamDto): Promise<Cam> {
    const camEntity = this.camRepository.create();
    const server = await this.serverRepository.findOne({
      id: cam.serverId,
    });

    if (!server) {
      throw new BadRequestException();
    }

    camEntity.name = cam.name;
    camEntity.server = server;
    camEntity.url = v4();

    const savedCam = await this.camRepository.save(camEntity);
    this.camInnerService.createRoom(camEntity.url);

    return savedCam;
  }

  // cam의 exitRooms 로직과 연결이 필요함!
  async deleteCam(id: number): Promise<void> {
    await this.camRepository.delete({ id: id });
  }

  async getCamList(serverId: number): Promise<ResponseCamDto[]> {
    const res = await this.camRepository.findByServerId(serverId);
    return res.map((entry) => ResponseCamDto.fromEntry(entry.name, entry.url));
  }
}
