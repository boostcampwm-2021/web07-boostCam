import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './server.entity';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Server])],
  providers: [],
  controllers: [],
})
export class UserModule {}
