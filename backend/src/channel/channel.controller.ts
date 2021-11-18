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
import { CreateChannelDto } from './channe.dto';
import { UserChannelService } from 'src/user-channel/user-channel.service';
import ResponseEntity from 'src/lib/ResponseEntity';

@Controller('api/channel')
@UseGuards(LoginGuard)
export class ChannelController {
  constructor(
    private channelService: ChannelService,
    private userChannelService: UserChannelService,
  ) {
    this.channelService = channelService;
    this.userChannelService = userChannelService;
  }
  @Get() async findAll(): Promise<ResponseEntity<Channel[]>> {
    const channelList = await this.channelService.findAll();
    return ResponseEntity.ok<Channel[]>(channelList);
  }
  @Get(':id') async findOne(
    @Param('id') id: number,
  ): Promise<ResponseEntity<Channel>> {
    const foundServer = await this.channelService.findOne(id);
    return ResponseEntity.ok<Channel>(foundServer);
  }
  @Post() async saveChannel(
    @Body() channel: CreateChannelDto,
    @Session() session: ExpressSession,
  ): Promise<ResponseEntity<Channel>> {
    const savedChannel = await this.channelService.addChannel(channel);
    await this.userChannelService.addNewChannel(savedChannel, session.user.id);
    return ResponseEntity.ok<Channel>(savedChannel);
  }
  @Patch(':id') async updateUser(
    @Param('id') id: number,
    @Body() channel: Channel,
  ): Promise<ResponseEntity<Channel>> {
    await this.channelService.updateChannel(id, channel);
    return ResponseEntity.ok<Channel>(channel);
  }

  @Delete(':id') async deleteChannel(
    @Param('id') id: number,
  ): Promise<ResponseEntity<number>> {
    await this.channelService.deleteChannel(id);
    return ResponseEntity.ok<number>(id);
  }
}
