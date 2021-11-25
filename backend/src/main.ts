import { NestFactory } from '@nestjs/core';
import { ExpressPeerServer } from 'peer';
import * as session from 'express-session';
import * as redis from 'redis';
import * as createRedisStore from 'connect-redis';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  const peerServer = ExpressPeerServer(server);
  const configService = app.get(ConfigService);

  const sessionOption: session.SessionOptions = {
    secret: configService.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
  };

  if (configService.get('SESSION') === 'redis') {
    const redisClient = redis.createClient({
      host: configService.get('REDIS_HOST'),
    });
    const RedisStore = createRedisStore(session);
    sessionOption.store = new RedisStore({ client: redisClient });
  }

  app.use(session(sessionOption));
  app.use('/peerjs', peerServer);
  await app.listen(9000);
}
bootstrap();
