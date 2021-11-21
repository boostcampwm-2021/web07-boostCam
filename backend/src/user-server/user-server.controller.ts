import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Session,
  UseGuards,
  HttpException,
  HttpCode,
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
    try {
      const user = session.user;
      const newUserServer = await this.userServerService.create(
        user,
        server.id,
      );
      return ResponseEntity.created(newUserServer.id);
    } catch (error) {
      throw new HttpException(error.response, 403);
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    try {
      this.userServerService.deleteById(id);
      return ResponseEntity.noContent();
    } catch (error) {
      throw new HttpException(error.response, 403);
    }
  }
}
