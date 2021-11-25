import { NestFactory } from '@nestjs/core';
import { ExpressPeerServer } from 'peer';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { createSessionMiddleware } from './session';
import { MessageSessionAdapter } from './message.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  const peerServer = ExpressPeerServer(server);
  const configService = app.get(ConfigService);
  const session = createSessionMiddleware(configService);

  app.use(session);
  app.useWebSocketAdapter(new MessageSessionAdapter(app, session));
  app.use('/peerjs', peerServer);
  await app.listen(9000);
}
bootstrap();
