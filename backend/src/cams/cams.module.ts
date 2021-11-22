import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { Cams } from './cams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cams, Server])],
  providers: [],
  controllers: [],
})
export class CamsModule {}
