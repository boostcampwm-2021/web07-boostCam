import { Controller, Get, Query, Session, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { MessageDto } from './message.dto';
import { MessageDtoSchema } from './message.scheme';
import { MessageService } from './message.service';

@Controller('/api/messages')
@UseGuards(LoginGuard)
@ApiExtraModels(ResponseEntity)
@ApiExtraModels(MessageDto)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOkResponse(MessageDtoSchema)
  @Get()
  async findMessagesByChannelId(
    @Session() session: ExpressSession,
    @Query('channelId') channelId: number,
  ): Promise<ResponseEntity<MessageDto[]>> {
    const sender = session.user;
    const channelMessages = await this.messageService.findMessagesByChannelId(
      sender.id,
      channelId,
    );
    return ResponseEntity.ok(channelMessages);
  }
}
