import { Controller, Get, Query, Session, UseGuards } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { MessageService } from './message.service';

@Controller('/api/messages')
@UseGuards(LoginGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

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
