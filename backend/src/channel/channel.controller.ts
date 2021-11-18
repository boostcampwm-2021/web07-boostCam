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

@Controller('api/channel')
export class ChannelController {
  constructor(private channelService: ChannelService) {
    this.channelService = channelService;
  }
  @Get('list') async findAll(): Promise<Channel[]> {
    const serverList = await this.channelService.findAll();
    return Object.assign({
      data: serverList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get(':id') async findOne(@Param('id') id: string): Promise<Channel> {
    const foundServer = await this.channelService.findOne(+id);
    return Object.assign({
      data: foundServer,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post() async saveChannel(
    @Body() channel: CreateChannelDto,
    @Session() session: ExpressSession,
  ): Promise<string> {
    const savedChannel = await this.channelService.addChannel(
      channel,
      session.user.id,
    );
    return Object.assign({
      data: { ...savedChannel },
      statusCode: 200,
      statusMsg: `saved successfully`,
    });
  }
  @Patch(':id') async updateUser(
    @Param('id') id: number,
    @Body() channel: Channel,
  ): Promise<string> {
    await this.channelService.updateChannel(id, channel);
    return Object.assign({
      data: { ...channel },
      statusCode: 200,
      statusMsg: `updated successfully`,
    });
  }

  @Delete(':id') async deleteChannel(@Param('id') id: string): Promise<string> {
    await this.channelService.deleteChannel(+id);
    return Object.assign({
      data: { id },
      statusCode: 200,
      statusMsg: `deleted successfully`,
    });
  }
}
