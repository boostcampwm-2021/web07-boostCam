import { Controller, Post, Body } from '@nestjs/common';
import { UserServer } from './user-server.entity';
import { UserServerService } from './user-server.service';

@Controller('/api/users/servers')
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Post()
  create(@Body() userServer: UserServer) {
    return this.userServerService.create(userServer);
  }
}
