import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Server } from '../server/server.entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { UserServerService } from './user-server.service';

@Controller('/api/users/servers')
@UseGuards(LoginGuard)
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Post()
  create(
    @Session()
    session: ExpressSession,
    @Body() server: Server,
  ) {
    const user = session.user;
    return this.userServerService.create(user, server);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userServerService.deleteById(id);
  }
}
