import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RequestUserServerDto } from '../dto/RequestUserServerDto';
import { UserServerService } from '../service/user-server.service';
import { UserServer } from '../user-server.entity';

@Controller('/api/user-servers')
export class UserServerController {
  constructor(private userService: UserServerService) {}

  @Get('/users/:id')
  getUserById(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userService.getByUserIdWithServerInfo(userId);
  }

  @Post()
  create(@Body() requestUserServerDto: RequestUserServerDto) {
    return this.userService.create(
      requestUserServerDto.userId,
      requestUserServerDto.serverId,
    );
  }
}
