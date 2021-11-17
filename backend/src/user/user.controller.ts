import { Controller, Get, Param } from '@nestjs/common';
import { UserServer } from 'src/user-server/user-server.entity';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id/servers')
  getUserById(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userService.getServerListByUserId(userId);
  }
}
