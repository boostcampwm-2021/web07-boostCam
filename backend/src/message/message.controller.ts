import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';

@Controller('/api/messages')
@UseGuards(LoginGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Session() session: ExpressSession,
    @Body('channelId') channelId: number,
    @Body('contents') contents: string,
  ): Promise<ResponseEntity<MessageDto>> {
    const sender = session.user;
    const newMessage = await this.messageService.sendMessage(
      sender.id,
      channelId,
      contents,
    );

    return ResponseEntity.ok(newMessage);
  }

  @Get()
  async findMessagesByChannelId(
    @Session() session: ExpressSession,
    @Query('channelId') channelId: number,
  ) {
    const sender = session.user;
    const channelMessages = await this.messageService.findMessagesByChannelId(
      sender.id,
      channelId,
    );
    return ResponseEntity.ok(channelMessages);
  }
}
