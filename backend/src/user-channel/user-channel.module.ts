import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from 'src/channel/channel.entity';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserChannelController } from './user-channel.controller';
import { UserChannel } from './user-channel.entity';
import { UserChannelRepository } from './user-channel.repository';
import { UserChannelService } from './user-channel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserChannel,
      User,
      Channel,
      UserChannelRepository,
      UserRepository,
    ]),
  ],
  providers: [UserChannelService],
  controllers: [UserChannelController],
  exports: [UserChannelService, TypeOrmModule],
})
export class UserChannelModule {}
