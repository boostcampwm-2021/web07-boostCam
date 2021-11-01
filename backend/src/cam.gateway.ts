import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CamGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    client.emit('receive', 'hello message');
    return 'Hello world!';
  }
}
