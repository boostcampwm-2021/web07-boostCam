import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';

@Controller('/api/user')
@UseGuards(LoginGuard)
export class UserController {
  @Get()
  getUser(@Session() session: ExpressSession) {
    return session.user;
  }
}
