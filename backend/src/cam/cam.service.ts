import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { ServerRepository } from '../server/server.repository';
import { RequestCamDto, ResponseCamDto } from './cam.dto';
import { Cam } from './cam.entity';
import { CamRepository } from './cam.repository';
import { CamInnerService } from './cam-inner.service';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class CamService {
  constructor(
    private camRepository: CamRepository,
    private serverRepository: ServerRepository,
    private userRepository: UserRepository,
    private readonly camInnerService: CamInnerService,
  ) {}

  async findOne(url: string): Promise<Cam> {
    const cam = await this.camRepository.findOne({ url: url });

    if (!cam) {
      throw new NotFoundException();
    }

    const available = this.camInnerService.checkRoomAvailable(url);

    if (!available) {
      throw new ForbiddenException();
    }

    return cam;
  }

  async findOneById(id: number): Promise<Cam> {
    const cam = await this.camRepository.findOne({ id: id });

    if (!cam) {
      throw new NotFoundException();
    }

    return cam;
  }

  async createCam(cam: RequestCamDto): Promise<Cam> {
    const camEntity = this.camRepository.create();
    const server = await this.serverRepository.findOne({
      id: cam.serverId,
    });

    if (!server) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.findOne({ id: cam?.userId });

    if (!cam.userId || !user) {
      throw new ForbiddenException();
    }

    camEntity.name = cam.name;
    camEntity.server = server;
    camEntity.url = v4();
    camEntity.owner = user;

    const savedCam = await this.camRepository.save(camEntity);
    this.camInnerService.createRoom(camEntity.url);

    return savedCam;
  }

  async deleteCam(id: number): Promise<void> {
    const camEntity = await this.camRepository.findOne({ id: id });

    if (!camEntity) {
      throw new BadRequestException();
    }

    this.camInnerService.deleteRoom(camEntity.url);

    await this.camRepository.delete({ id: camEntity.id });
  }

  async getCamList(serverId: number): Promise<ResponseCamDto[]> {
    const res = await this.camRepository.findByServerId(serverId);
    return res.map((entry) => ResponseCamDto.fromEntry(entry));
  }
}
