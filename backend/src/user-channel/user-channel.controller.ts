import {
  Controller,
  Delete,
  Param,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Channel } from 'src/channel/channel.entity';
import ResponseEntity from 'src/lib/ResponseEntity';
import { LoginGuard } from 'src/login/login.guard';
import { ExpressSession } from '../types/session';
import { UserChannelService } from './user-channel.service';

@Controller('/api/user/channels')
@UseGuards(LoginGuard)
export class UserChannelController {
  constructor(private userChannelService: UserChannelService) {
    this.userChannelService = userChannelService;
  }

  @Get('/joined/:id')
  async getJoinedChannelList(
    @Param('id') serverId: number,
    @Session() session: ExpressSession,
  ) {
    const response = await this.userChannelService.getJoinedChannelListByUserId(
      serverId,
      session.user.id,
    );
    const joinedChannelList = response.map(
      (userChannel) => userChannel.channel,
    );
    return ResponseEntity.ok<Channel[]>(joinedChannelList);
  }

  @Get('/notjoined/:id')
  async getNotJoinedChannelList(
    @Param('id') serverId: number,
    @Session() session: ExpressSession,
  ) {
    const response =
      await this.userChannelService.getNotJoinedChannelListByUserId(
        serverId,
        session.user.id,
      );
    const notJoinedChannelList = response.map(
      (userChannel) => userChannel.channel,
    );
    return ResponseEntity.ok<Channel[]>(notJoinedChannelList);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userChannelService.deleteById(id);
  }
}
