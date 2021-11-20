import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { Server } from './server.entity';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ServerRepository } from './server.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server, ServerRepository])],
  providers: [ServerService],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule {}
