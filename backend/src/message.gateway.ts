import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ExpressSession } from './types/session';

declare module 'http' {
  interface IncomingMessage {
    session: ExpressSession;
  }
}

@WebSocketGateway({ namespace: '/message' })
export class MessageGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    const user = client.request.session.user;
    if (!user) {
      return;
    }
    return 'Hello world!';
  }
}
