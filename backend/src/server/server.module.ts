import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { Server } from './server.entity';
import { ServerService } from './service/server.service';
import { ServerRepository } from './repository/server.repository';
import { ServerController } from './server.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server, ServerRepository])],
  providers: [ServerService],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule {}
