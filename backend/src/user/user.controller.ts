import { Controller, Get, UseGuards, Session } from '@nestjs/common';
import ResponseEntity from '../common/response-entity';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import { UserDto } from './user.dto';

@Controller('/api/user')
@UseGuards(LoginGuard)
export class UserController {
  @Get()
  getUser(@Session() session: ExpressSession) {
    return ResponseEntity.ok<UserDto>(UserDto.fromEntity(session.user));
  }
}
