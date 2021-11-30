import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';

import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { ChannelFormDto } from './channel-form.dto';
import { UserChannelService } from '../user-channel/user-channel.service';
import ResponseEntity from '../common/response-entity';

@Controller('/api/channels')
@UseGuards(LoginGuard)
export class ChannelController {
  constructor(
    private channelService: ChannelService,
    private userChannelService: UserChannelService,
  ) {
    this.channelService = channelService;
    this.userChannelService = userChannelService;
  }
  @Get(':channelId') async findOne(
    @Param('channelId') id: number,
  ): Promise<ResponseEntity<Channel>> {
    const foundChannel = await this.channelService.findOne(id);
    return ResponseEntity.ok<Channel>(foundChannel);
  }

  @Get(':channelId/auth') async checkAuthority(
    @Param('channelId') id: number,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<boolean>> {
    const foundChannel = await this.channelService.findOne(id);
    return ResponseEntity.ok<boolean>(foundChannel.ownerId === session.user.id);
  }

  @Post() async saveChannel(
    @Body() channel: ChannelFormDto,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<Channel>> {
    const savedChannel = await this.channelService.createChannel(
      channel,
      session.user.id,
    );
    await this.userChannelService.addNewChannel(savedChannel, session.user.id);
    return ResponseEntity.ok<Channel>(savedChannel);
  }
  @Patch(':channelId') async updateChannel(
    @Param('channelId') id: number,
    @Body() channel: ChannelFormDto,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<Channel>> {
    const changedChannel = await this.channelService.updateChannel(
      id,
      channel,
      session.user.id,
    );
    return ResponseEntity.ok<Channel>(changedChannel);
  }

  @Delete(':channelId') async deleteChannel(
    @Param('channelId') id: number,
  ): Promise<ResponseEntity<null>> {
    await this.channelService.deleteChannel(id);
    return ResponseEntity.noContent();
  }
}
