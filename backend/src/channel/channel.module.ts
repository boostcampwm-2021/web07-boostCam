import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Server } from '../server/server.entity';
import { UserChannelService } from '../user-channel/user-channel.service';
import { UserChannelRepository } from '../user-channel/user-channel.repository';
import { UserRepository } from '../user/user.repository';
import { ChannelRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      Server,
      UserChannelRepository,
      UserRepository,
      ChannelRepository,
    ]),
  ],
  providers: [ChannelService, UserChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
