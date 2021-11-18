import {
  Controller,
  Delete,
  Param,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from 'src/login/login.guard';
import { ExpressSession } from '../types/session';
import { UserChannelService } from './user-channel.service';

@Controller('/api/user/channels')
@UseGuards(LoginGuard)
export class UserChannelController {
  constructor(private userChannelService: UserChannelService) {
    this.userChannelService = userChannelService;
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
