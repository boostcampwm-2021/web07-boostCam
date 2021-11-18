import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChannelController } from './user-channel.controller';
import { UserChannel } from './user-channel.entity';
import { UserChannelRepository } from './user-channel.repository';
import { UserChannelService } from './user-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserChannel, UserChannelRepository])],
  providers: [UserChannelService],
  controllers: [UserChannelController],
  exports: [UserChannelService, TypeOrmModule],
})
export class UserChannelModule {}
