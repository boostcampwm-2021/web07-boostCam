import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamModule } from '../cam/cam.module';
import { Server } from '../server/server.entity';
import { ServerRepository } from '../server/server.repository';
import { CamsController } from './cams.controller';
import { Cams } from './cams.entity';
import { CamsRepository } from './cams.repository';
import { CamsService } from './cams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cams, Server, CamsRepository, ServerRepository]),
    CamModule,
  ],
  providers: [CamsService],
  controllers: [CamsController],
})
export class CamsModule {}
