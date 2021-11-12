import Peer from 'peerjs';
import { Socket } from 'socket.io-client';

class SharedScreenSender {
  private peer: Peer | null = null;

  private connections: Peer.MediaConnection[] = [];

  private handleRequestScreenShare: (({ peerId }: { peerId: string }) => void) | undefined;

  constructor(private readonly socket: Socket, private readonly roomId: string) {}

  prepareScreenShare(screenStream: MediaStream): void {
    if (!screenStream) {
      return;
    }

    this.peer = new Peer(undefined, {
      host: '/',
      path: '/peerjs',
      port: parseInt(process.env.REACT_APP_PEERJS_PORT as string, 10),
    });

    this.connections = [];

    this.peer.on('open', () => {
      this.socket.emit('startScreenShare', { roomId: this.roomId });
    });

    this.handleRequestScreenShare = ({ peerId }: { peerId: string }) => {
      const call = this.peer?.call(peerId, screenStream);
      if (call) {
        this.connections.push(call);
      }
    };

    this.socket.on('requestScreenShare', this.handleRequestScreenShare);
  }

  stopSharingScreen(): void {
    this.socket.removeAllListeners('requestScreenShare');
    this.closeConnections();
    this.peer?.destroy();
    this.socket.emit('endSharingScreen', { roomId: this.roomId });
  }

  private closeConnections(): void {
    this.connections.forEach((connection) => {
      connection.close();
    });
  }
}

export default SharedScreenSender;
