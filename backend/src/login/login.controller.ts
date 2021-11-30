import { Controller, Get, Query, Session } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ExpressSession } from '../types/session';
import { UserDto } from '../user/user.dto';

import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOkResponse({ type: UserDto })
  @Get('/github')
  async githubLogin(
    @Session()
    session: ExpressSession,
    @Query('code') code: string,
  ): Promise<UserDto> {
    const user = await this.loginService.githubLogin(code);
    session.user = user;
    session.save();
    return UserDto.fromEntity(user);
  }
}
