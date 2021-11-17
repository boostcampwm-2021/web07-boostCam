import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

import githubConfig from '../config/github.config';

@Injectable()
export class LoginService {
  constructor(
    @Inject(githubConfig.KEY) private config: ConfigType<typeof githubConfig>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async githubLogin(code: string): Promise<User> {
    try {
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
      const githubUserResponse = await axios.get(
        'https://api.github.com/user',
        {
          headers: { Authorization: `token ${accessToken}` },
        },
      );

      const { id: githubId, avator_url } = githubUserResponse.data;
      const user = await this.userRepository.findOne({ where: { githubId } });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException('bad request', 400);
    }
  }
}
