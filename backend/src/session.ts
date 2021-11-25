import * as session from 'express-session';
import * as redis from 'redis';
import * as createRedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';

export function createSessionMiddleware(configService: ConfigService) {
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

  return session(sessionOption);
}
