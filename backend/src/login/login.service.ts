import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import githubConfig from '../config/github.config';

@Injectable()
export class LoginService {
  constructor(
    @Inject(githubConfig.KEY) private config: ConfigType<typeof githubConfig>,
  ) {}
  async githubLogin(code: string) {
    console.log(this.config);
  }
}
