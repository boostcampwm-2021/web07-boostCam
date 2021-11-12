import Peer from 'peerjs';
import React from 'react';
import { Socket } from 'socket.io-client';

class SharedScreenReceiver {
  private readonly peer: Peer;

  constructor(
    private readonly socket: Socket,
    private readonly roomId: string,
    private setSharedScreen: React.Dispatch<React.SetStateAction<MediaStream | null>>,
  ) {
    this.peer = new Peer(undefined, {
      host: '/',
      path: '/peerjs',
      port: parseInt(process.env.REACT_APP_PEERJS_PORT as string, 10),
    });

    this.peer.on('open', (peerId) => {
      this.socket.on('screenShareStarted', ({ screenSharingUserId }: { screenSharingUserId: string }) => {
        this.socket.emit('requestScreenShare', { peerId, screenSharingUserId });
      });

      this.socket.on('getScreenSharingUser', ({ screenSharingUserId }: { screenSharingUserId: string }) => {
        if (!screenSharingUserId) {
          return;
        }
        this.socket.emit('requestScreenShare', { peerId, screenSharingUserId });
      });
      this.socket.emit('getScreenSharingUser', { roomId: this.roomId });
    });

    this.peer.on('call', (call) => {
      call.answer(undefined);
      call.on('stream', (screenStream) => {
        this.setSharedScreen(screenStream);
      });
      call.on('close', () => {
        this.setSharedScreen(null);
      });
    });

    this.peer.on('disconnected', () => {
      this.setSharedScreen(null);
    });

    this.socket.on('endSharingScreen', () => {
      this.setSharedScreen(null);
    });
  }

  setSetScreen(setScreen: React.Dispatch<React.SetStateAction<MediaStream | null>>): void {
    this.setSharedScreen = setScreen;
  }

  close(): void {
    this.peer.destroy();
    this.socket.removeAllListeners('screenShareStarted');
    this.socket.removeAllListeners('endSharingScreen');
    this.socket.removeAllListeners('getScreenSharingUser');
  }
}

export default SharedScreenReceiver;
