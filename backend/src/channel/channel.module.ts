import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Server } from '../server/server.entity';
import { UserChannelService } from '../user-channel/user-channel.service';
import { UserChannelRepository } from '../user-channel/user-channel.repository';
import { UserRepository } from '../user/user.repository';
import { ChannelRepository } from './channel.repository';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      Server,
      User,
      UserChannelRepository,
      UserRepository,
      ChannelRepository,
    ]),
  ],
  providers: [ChannelService, UserChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
