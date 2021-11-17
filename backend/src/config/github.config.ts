import { registerAs } from '@nestjs/config';

interface GitHubConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export default registerAs(
  'github',
  (): GitHubConfig => ({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  }),
);
