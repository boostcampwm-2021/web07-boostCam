import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [],
  controllers: [],
})
export class ChannelModule {}
