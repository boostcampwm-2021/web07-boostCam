import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './user-server.controller';
import { UserServerRepository } from './user-server.repository';
import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';
import { ServerModule } from '../server/server.module';

@Module({
  imports: [
    forwardRef(() => ServerModule),
    TypeOrmModule.forFeature([UserServer, UserServerRepository]),
  ],
  providers: [UserServerService],
  controllers: [UserServerController],
  exports: [UserServerService],
})
export class UserServerModule {}
