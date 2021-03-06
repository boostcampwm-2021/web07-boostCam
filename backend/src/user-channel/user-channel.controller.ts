import {
  Controller,
  Delete,
  Param,
  Session,
  Get,
  UseGuards,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { UserChannelService } from './user-channel.service';
import { ChannelService } from '../channel/channel.service';
import { UserChannel } from './user-channel.entity';
import { User } from '../user/user.entity';
import ChannelResponseDto from '../channel/dto/channel-response.dto';

@Controller('/api/user/servers/:serverId')
@UseGuards(LoginGuard)
export class UserChannelController {
  constructor(
    private userChannelService: UserChannelService,
    private channelService: ChannelService,
  ) {}

  @Get('/channels/joined/')
  async getJoinedChannelList(
    @Param('serverId', new ParseIntPipe()) serverId: number,
    @Session() session: ExpressSession,
  ) {
    const joinedChannelList =
      await this.userChannelService.getJoinedChannelListByUserId(
        serverId,
        session.user.id,
      );
    return ResponseEntity.ok<ChannelResponseDto[]>(joinedChannelList);
  }

  @Get('/channels/notjoined/')
  async getNotJoinedChannelList(
    @Param('serverId', new ParseIntPipe()) serverId: number,
    @Session() session: ExpressSession,
  ) {
    const response =
      await this.userChannelService.getNotJoinedChannelListByUserId(
        serverId,
        session.user.id,
      );
    return ResponseEntity.ok<ChannelResponseDto[]>(response);
  }

  @Get('/channels/users')
  async getJoinedUserList(
    @Param('serverId', new ParseIntPipe()) serverId: number,
    @Query('channelId', new ParseIntPipe()) channelId: number,
  ) {
    const response =
      await this.userChannelService.findJoinedUserListByChannelId(
        serverId,
        channelId,
      );
    return ResponseEntity.ok<User[]>(response);
  }

  @Post('/channels')
  async joinNewChannel(
    @Body('channelId') channelId: number,
    @Param('serverId', new ParseIntPipe()) serverId: number,
    @Session() session: ExpressSession,
  ) {
    const selectedChannel = await this.channelService.findOne(channelId);
    const savedChannel = await this.userChannelService.addNewChannel(
      selectedChannel,
      session.user.id,
    );
    return ResponseEntity.ok<UserChannel>(savedChannel);
  }

  @Delete('/channels/:channelId')
  async delete(
    @Param('channelId', new ParseIntPipe()) channeld: number,
    @Session() session: ExpressSession,
  ) {
    try {
      this.userChannelService.deleteByUserIdAndChannelId(
        session.user.id,
        channeld,
      );
      return ResponseEntity.noContent();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
