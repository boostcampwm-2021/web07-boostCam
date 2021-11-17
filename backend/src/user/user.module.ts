import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server])],
  providers: [UserService],
  controllers: [],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
