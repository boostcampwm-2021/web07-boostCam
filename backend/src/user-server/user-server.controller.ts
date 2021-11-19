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
import ResponseEntity from 'src/common/response-entity';

@Controller('/api/users/servers')
@UseGuards(LoginGuard)
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Post()
  async create(
    @Session()
    session: ExpressSession,
    @Body() server: Server,
  ) {
    const user = session.user;
    const newUserServer = await this.userServerService.create(user, server.id);
    return ResponseEntity.created(newUserServer.id);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userServerService.deleteById(id);
  }
}
