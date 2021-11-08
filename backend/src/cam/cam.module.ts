import { Module } from '@nestjs/common';
import { CamGateway } from './cam.gateway';
import { CamService } from './cam.service';

@Module({
  providers: [CamGateway, CamService],
})
export class CamModule {}
