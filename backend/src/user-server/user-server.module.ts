import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './user-server.controller';
import { UserServerRepository } from './user-server.repository';
import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserServer, UserServerRepository])],
  providers: [UserServerService],
  controllers: [UserServerController],
  exports: [TypeOrmModule],
})
export class UserServerModule {}
