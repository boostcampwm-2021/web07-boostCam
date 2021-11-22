import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';

import { LoginGuard } from '../login/login.guard';
import { CreateCamsDto } from './cams.dto';
import { CamsService } from './cams.service';

@Controller('/api/cams')
@UseGuards(LoginGuard)
export class CamsController {
  constructor(private camsService: CamsService) {
    this.camsService = camsService;
  }

  @Post() async createCams(
    @Body() cams: CreateCamsDto,
  ): Promise<ResponseEntity<number>> {
    const savedCams = await this.camsService.createCams(cams);
    return ResponseEntity.created(savedCams.id);
  }
}
