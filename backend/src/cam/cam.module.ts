import { Module } from '@nestjs/common';
import { CamGateway } from './cam.gateway';
import { CamService } from './cam.service';
import { CamController } from './cam.controller';

@Module({
  providers: [CamGateway, CamService],
  controllers: [CamController],
  exports: [CamService],
})
export class CamModule {}
