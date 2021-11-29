import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CamGateway } from './cam.gateway';
import { CamInnerService } from './cam-inner.service';
import { CamController } from './cam.controller';
import { CamService } from './cam.service';
import { Cam } from './cam.entity';
import { ServerRepository } from '../server/server.repository';
import { CamRepository } from './cam.repository';
import { Server } from '../server/server.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cam,
      Server,
      CamRepository,
      ServerRepository,
      User,
      UserRepository,
    ]),
  ],
  providers: [CamGateway, CamInnerService, CamService],
  controllers: [CamController],
  exports: [CamService],
})
export class CamModule {}
