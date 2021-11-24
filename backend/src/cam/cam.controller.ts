import { Controller, Post, Body } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';

import { CreateCamDto } from './cam.dto';
import { CamService } from './cam.service';

@Controller('api/cam')
export class CamController {
  constructor(private camService: CamService) {}

  @Post() async createCam(
    @Body() cam: CreateCamDto,
  ): Promise<ResponseEntity<number>> {
    const savedCam = await this.camService.createCam(cam);

    return ResponseEntity.created(savedCam.id);
  }
}
