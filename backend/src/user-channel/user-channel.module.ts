import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from '../channel/channel.entity';
import { ChannelService } from '../channel/channel.service';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserChannelController } from './user-channel.controller';
import { UserChannel } from './user-channel.entity';
import { UserChannelRepository } from './user-channel.repository';
import { UserChannelService } from './user-channel.service';
import { ServerRepository } from '../server/server.repository';
import { Server } from '../server/server.entity';
import { ChannelRepository } from '../channel/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserChannel,
      User,
      Channel,
      Server,
      UserChannelRepository,
      UserRepository,
      ServerRepository,
      ChannelRepository,
    ]),
  ],
  providers: [UserChannelService, ChannelService],
  controllers: [UserChannelController],
  exports: [UserChannelService, TypeOrmModule],
})
export class UserChannelModule {}
