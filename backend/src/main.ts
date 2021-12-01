import { NestFactory } from '@nestjs/core';
import { ExpressPeerServer } from 'peer';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { createSessionMiddleware } from './session';
import { MessageSessionAdapter } from './message.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  const peerServer = ExpressPeerServer(server);
  const configService = app.get(ConfigService);
  const session = createSessionMiddleware(configService);

  const config = new DocumentBuilder()
    .setTitle('boostCam API')
    .setDescription('boostCam API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(session);
  app.useWebSocketAdapter(new MessageSessionAdapter(app, session));
  app.use('/peerjs', peerServer);
  await app.listen(9000);
}
bootstrap();
