import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { CamsController } from './cams.controller';
import { Cams } from './cams.entity';
import { CamsRepository } from './cams.repository';
import { CamsService } from './cams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cams, Server, CamsRepository])],
  providers: [CamsService],
  controllers: [CamsController],
})
export class CamsModule {}
