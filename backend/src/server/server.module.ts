import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { Server } from './server.entity';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server])],
  providers: [ServerService],
  controllers: [ServerController],
})
export class ServerModule {}
