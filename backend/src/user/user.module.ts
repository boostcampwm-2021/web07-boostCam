import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server, UserRepository])],
  providers: [UserService],
  controllers: [],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
