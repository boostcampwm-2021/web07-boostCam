import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserServerModule } from '../user-server/user-server.module';

@Module({
  imports: [UserServerModule, TypeOrmModule.forFeature([User, Server])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
