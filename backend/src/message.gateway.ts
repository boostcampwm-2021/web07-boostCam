import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from './comment/comment.service';
import { MessageDto } from './message/message.dto';
import { MessageService } from './message/message.service';
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

  constructor(
    private userChannelService: UserChannelService,
    private messageService: MessageService,
    private commentService: CommentService,
  ) {}

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
  handleConnectOne(client: Socket, payload: { channelId: number }) {
    if (!this.checkLoginSession(client)) {
      return;
    }
    const channelRoom = payload.channelId.toString();
    client.join(channelRoom);
  }

  @SubscribeMessage('sendMessage')
  async handleSendedMessage(
    client: Socket,
    payload: { channelId: number; contents: string },
  ) {
    if (!this.checkLoginSession(client)) {
      return;
    }
    const { channelId, contents } = payload;
    const user = client.request.session.user;
    const newMessage = await this.messageService.sendMessage(
      user.id,
      channelId,
      contents,
    );
    this.emitMessage(channelId, newMessage);
  }

  @SubscribeMessage('sendComment')
  async handleSendComment(
    client: Socket,
    payload: { channelId: number; messageId: number; contents: string },
  ) {
    if (!this.checkLoginSession(client)) {
      return;
    }
    const { channelId, messageId, contents } = payload;
    const sender = client.request.session.user;
    const newComment = await this.commentService.sendComment(
      sender.id,
      channelId,
      messageId,
      contents,
    );
    this.server.to(`${channelId}`).emit('receiveComment', newComment);
  }

  private checkLoginSession(client: Socket): boolean {
    const user = client.request.session.user;
    return !!user;
  }

  emitMessage(channelId: number, message: MessageDto) {
    this.server.to(`${channelId}`).emit('receiveMessage', message);
  }
}
