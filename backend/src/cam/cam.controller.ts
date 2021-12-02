import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Session,
  Delete,
  ForbiddenException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { RequestCamDto } from './cam.dto';
import { Cam } from './cam.entity';
import { CamService } from './cam.service';

@Controller('/api/cam')
export class CamController {
  constructor(private camService: CamService) {}

  @UseGuards(LoginGuard)
  @Post()
  async createCam(
    @Body() cam: RequestCamDto,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<number>> {
    cam.userId = session.user?.id;
    const savedCam = await this.camService.createCam(cam);

    return ResponseEntity.created(savedCam.id);
  }

  @Get('/:url') async checkCam(
    @Param('url') url: string,
  ): Promise<ResponseEntity<Cam>> {
    const cam = await this.camService.findOne(url);

    return ResponseEntity.ok<Cam>(cam);
  }

  @UseGuards(LoginGuard)
  @Delete('/:id') async deleteCam(
    @Param('id', new ParseIntPipe()) id: number,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<number>> {
    const cam = await this.camService.findOneById(id);
    const isOwner = session.user?.id == cam.ownerId;

    if (!isOwner) {
      throw new ForbiddenException();
    }

    await this.camService.deleteCam(id);

    return ResponseEntity.noContent();
  }
}
