import { Module } from '@nestjs/common';
import { CamGateway } from './cam.gateway';

@Module({
  providers: [CamGateway],
})
export class CamModule {}
