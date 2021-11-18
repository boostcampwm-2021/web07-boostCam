import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Session,
} from '@nestjs/common';
import { ExpressSession } from '../types/session';

import { ChannelService } from './channel.service';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './channe.dto';
import ResponseEntity from 'src/lib/ResponseEntity';

@Controller('api/channel')
export class ChannelController {
  constructor(private channelService: ChannelService) {
    this.channelService = channelService;
  }
  @Get('list') async findAll(): Promise<ResponseEntity<Channel[]>> {
    const serverList = await this.channelService.findAll();
    return ResponseEntity.ok<Channel[]>(serverList);
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
    const savedChannel = await this.channelService.addChannel(
      channel,
      session.user.id,
    );
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
