import { Controller, Get, Query } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Get('/github')
  async githubLogin(@Query('code') code: string) {
    return await this.loginService.githubLogin(code);
  }
}
