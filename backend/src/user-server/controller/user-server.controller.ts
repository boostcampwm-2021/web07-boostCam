import { Controller, Get, Param } from '@nestjs/common';
import { UserServerService } from '../service/user-server.service';
import { UserServer } from '../user-server.entity';

@Controller('/api/user-servers')
export class UserServerController {
  constructor(private userService: UserServerService) {}

  @Get('/users/:id')
  getUserById(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userService.getByUserIdWithServerInfo(userId);
  }
}
