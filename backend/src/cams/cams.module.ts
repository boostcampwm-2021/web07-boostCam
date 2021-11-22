import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamService } from '../cam/cam.service';
import { Server } from '../server/server.entity';
import { ServerRepository } from '../server/server.repository';
import { CamsController } from './cams.controller';
import { Cams } from './cams.entity';
import { CamsRepository } from './cams.repository';
import { CamsService } from './cams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cams, Server, CamsRepository, ServerRepository]),
  ],
  providers: [CamsService, CamService],
  controllers: [CamsController],
})
export class CamsModule {}
