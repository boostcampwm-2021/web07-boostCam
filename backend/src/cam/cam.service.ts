import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { ServerRepository } from '../server/server.repository';
import { CreateCamDto, ResponseCamDto } from './cam.dto';
import { Cam } from './cam.entity';
import { CamRepository } from './cam.repository';
import { CamInnerService } from './cam-inner.service';

@Injectable()
export class CamService {
  constructor(
    private camRepository: CamRepository,
    private serverRepository: ServerRepository,
    @Inject(forwardRef(() => CamInnerService))
    private readonly camInnerService: CamInnerService,
  ) {
    this.camRepository.clear();
  }

  findOne(url: string): Promise<Cam> {
    return this.camRepository.findOne({ url: url });
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

  async deleteCam(url: string): Promise<void> {
    await this.camRepository.delete({ url: url });
  }

  async getCamList(serverId: number): Promise<ResponseCamDto[]> {
    const res = await this.camRepository.findByServerId(serverId);
    return res.map((entry) => ResponseCamDto.fromEntry(entry.name, entry.url));
  }
}
