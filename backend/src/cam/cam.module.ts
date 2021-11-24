import { Module } from '@nestjs/common';
import { CamGateway } from './cam.gateway';
import { CamInnerService } from './cam-inner.service';
import { CamController } from './cam.controller';
import { CamService } from './cam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cam } from './cam.entity';
import { ServerRepository } from '../server/server.repository';
import { CamRepository } from './cam.repository';
import { Server } from '../server/server.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cam, Server, CamRepository, ServerRepository]),
  ],
  providers: [CamGateway, CamInnerService, CamService],
  controllers: [CamController],
  exports: [CamService],
})
export class CamModule {}
