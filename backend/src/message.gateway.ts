import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './message/message.dto';
import { ExpressSession } from './types/session';
import { UserChannelService } from './user-channel/user-channel.service';

declare module 'http' {
  interface IncomingMessage {
    session: ExpressSession;
  }
}

@WebSocketGateway({ namespace: '/message' })
export class MessageGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private userChannelService: UserChannelService) {}

  @SubscribeMessage('joinChannels')
  async handleConnect(client: Socket, payload: any) {
    if (!this.checkLoginSession(client)) {
      client.disconnect();
      return;
    }
    const user = client.request.session.user;
    const channels = await this.userChannelService.findChannelsByUserId(
      user.id,
    );

    client.join(channels);
  }

  @SubscribeMessage('joinChannel')
  handleMessage(client: Socket, payload: { channelId: number }) {
    if (!this.checkLoginSession(client)) {
      return;
    }
    const channelRoom = payload.channelId.toString();
    client.join(channelRoom);
  }

  private checkLoginSession(client: Socket): boolean {
    const user = client.request.session.user;
    return !!user;
  }

  emitMessage(channelId: number, message: MessageDto) {
    this.server.to(`${channelId}`).emit('sendMessage', message);
  }
}
