import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from 'src/server/server.module';
import { UserModule } from 'src/user/user.module';
import { UserServerController } from './user-server.controller';
import { UserServerRepository } from './user-server.repository';
import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';

@Module({
  imports: [
    ServerModule,
    UserModule,
    TypeOrmModule.forFeature([UserServer, UserServerRepository]),
  ],
  providers: [UserServerService],
  controllers: [UserServerController],
})
export class UserServerModule {}
