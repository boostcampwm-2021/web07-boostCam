import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import { INestApplication } from '@nestjs/common';

export class MessageSessionAdapter extends IoAdapter {
  private sessionMiddleware;

  constructor(app: INestApplication, sessionMiddleware) {
    super(app);
    this.sessionMiddleware = sessionMiddleware;
  }

  createIOServer(port: number, options?: any): any {
    const server: Server = super.createIOServer(port, options);
    server.use((socket, next) => {
      this.sessionMiddleware(socket.request, {}, next);
    });

    return server;
  }
}
