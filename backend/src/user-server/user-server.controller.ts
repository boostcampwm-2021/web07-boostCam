import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserServer } from './user-server.entity';
import { UserServerService } from './user-server.service';

@Controller('/api/users/servers')
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Post()
  create(@Body() userServer: UserServer) {
    return this.userServerService.create(userServer);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userServerService.deleteById(id);
  }
}
