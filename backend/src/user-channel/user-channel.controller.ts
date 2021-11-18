import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Session,
  Get,
} from '@nestjs/common';
import { ExpressSession } from '../types/session';
import { UserChannel } from './user-channel.entity';
import { UserChannelService } from './user-channel.service';

@Controller('/api/user/channels')
export class UserChannelController {
  constructor(private userChannelService: UserChannelService) {}

  @Post()
  create(@Body() userChannel: UserChannel) {
    return this.userChannelService.create(userChannel);
  }

  @Get()
  getJoinedChannelList(
    @Param('serverId') serverid: number,
    @Session() session: ExpressSession,
  ) {
    console.log(session.user);
    //return this.userChannelService.deleteById(serverid);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userChannelService.deleteById(id);
  }
}
