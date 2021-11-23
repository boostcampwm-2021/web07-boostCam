import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
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
  ) {
    const sender = session.user;
    return await this.messageService.sendMessage(
      sender.id,
      channelId,
      contents,
    );
  }
}
