import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from './channel.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Server } from 'src/server/server.entity';
import { UserChannelService } from 'src/user-channel/user-channel.service';
import { UserChannelRepository } from 'src/user-channel/user-channel.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel,
      Server,
      UserChannelRepository,
      UserRepository,
    ]),
  ],
  providers: [ChannelService, UserChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
