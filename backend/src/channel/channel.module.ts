import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
