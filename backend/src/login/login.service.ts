import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

import githubConfig from '../config/github.config';

type GitHubUser = {
  githubId: number;
  nickname: string;
  profile: string;
};

@Injectable()
export class LoginService {
  constructor(
    @Inject(githubConfig.KEY) private config: ConfigType<typeof githubConfig>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async githubLogin(code: string): Promise<User> {
    try {
      const accessToken = await this.getAccessToken(code);
      const githubUser = await this.getGitHubUser(accessToken);

      let user = await this.userRepository.findOne({
        where: { githubId: githubUser.githubId },
      });

      if (!user) {
        user = await this.registerByGitHubUser(githubUser);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async getAccessToken(code: string): Promise<string> {
    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.config.clientID,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.callbackURL,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      },
    );
    const { access_token: accessToken } = accessTokenResponse.data;
    return accessToken;
  }

  private async getGitHubUser(accessToken: string): Promise<GitHubUser> {
    const githubUserResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const { id, avatar_url, login } = githubUserResponse.data;
    return {
      githubId: id,
      nickname: login,
      profile: avatar_url,
    };
  }

  private async registerByGitHubUser(githubUser: GitHubUser) {
    const { githubId, nickname, profile } = githubUser;
    const newUser = this.userRepository.create();
    newUser.githubId = githubId;
    newUser.nickname = nickname;
    newUser.profile = profile;
    return await this.userRepository.save(newUser);
  }
}
