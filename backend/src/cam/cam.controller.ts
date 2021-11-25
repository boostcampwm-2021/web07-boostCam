import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import ResponseEntity from '../common/response-entity';
import { CreateCamDto } from './cam.dto';
import { Cam } from './cam.entity';
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

  @Get('/:url') async checkCam(
    @Param('url') url: string,
  ): Promise<ResponseEntity<Cam>> {
    const cam = await this.camService.findOne(url);

    return ResponseEntity.ok<Cam>(cam);
  }
}
