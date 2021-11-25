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
  HttpStatus,
} from '@nestjs/common';
import { Server } from '../server/server.entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { UserServerService } from './user-server.service';
import ResponseEntity from '../common/response-entity';

@Controller('/api/users/servers')
@UseGuards(LoginGuard)
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Post()
  async createUserServer(
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Session()
    session: ExpressSession,
    @Param('id') id: number,
  ) {
    try {
      const userId = session.user.id;
      await this.userServerService.deleteById(id, userId);
      return ResponseEntity.noContent();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
