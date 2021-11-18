import { Controller, Get, Param, UseGuards, Session } from '@nestjs/common';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerService } from '../user-server/user-server.service';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';

@Controller('/api/user')
@UseGuards(LoginGuard)
export class UserController {
  constructor(private userServerService: UserServerService) {}

  @Get('/:id/servers')
  getServersByUserId(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userServerService.getServerListByUserId(userId);
  }

  @Get()
  getUser(@Session() session: ExpressSession) {
    return session.user;
  }
}
