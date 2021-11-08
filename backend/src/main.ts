import { NestFactory } from '@nestjs/core';
import { ExpressPeerServer } from 'peer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  const peerServer = ExpressPeerServer(server);

  app.use('/peerjs', peerServer);
  await app.listen(9000);
}
bootstrap();
