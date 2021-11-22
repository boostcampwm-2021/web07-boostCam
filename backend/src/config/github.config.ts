import { registerAs } from '@nestjs/config';

interface GitHubConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export default registerAs(
  'github',
  (): GitHubConfig => ({
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: process.env.CALLBACK_URL_GITHUB,
  }),
);
