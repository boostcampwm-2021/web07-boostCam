import { Controller, Get, Query, Session } from '@nestjs/common';
import { ExpressSession } from '../types/session';

import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Get('/github')
  async githubLogin(
    @Session()
    session: ExpressSession,
    @Query('code') code: string,
  ) {
    const user = await this.loginService.githubLogin(code);
    session.user = user;
    session.save();
    return user;
  }
}
