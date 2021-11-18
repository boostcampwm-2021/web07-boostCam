import { Controller, Get, Param } from '@nestjs/common';
import { UserServer } from 'src/user-server/user-server.entity';
import { UserServerService } from 'src/user-server/user-server.service';

@Controller('/api/users')
export class UserController {
  constructor(private userServerService: UserServerService) {}

  @Get('/:id/servers')
  getUserById(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userServerService.getServerListByUserId(userId);
  }
}
