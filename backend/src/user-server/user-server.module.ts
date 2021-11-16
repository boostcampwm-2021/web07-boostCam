import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServerController } from './controller/user-server.controller';
import { UserServerRepository } from './repository/user-server.repository';
import { UserServerService } from './service/user-server.service';
import { UserServer } from './user-server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserServer, UserServerRepository])],
  providers: [UserServerService],
  controllers: [UserServerController],
})
export class UserServerModule {}
