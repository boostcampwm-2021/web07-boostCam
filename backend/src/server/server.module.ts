import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Server } from './server.entity';
import { User } from 'src/user/user.entity';
import { ServerService } from './service/server.service';
import { ServerRepository } from './repository/server.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server, ServerRepository])],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
