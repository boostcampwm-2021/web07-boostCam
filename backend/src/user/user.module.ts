import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/server.entity';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class UserModule {}
