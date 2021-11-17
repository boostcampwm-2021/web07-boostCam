import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestUserServerDto } from './dto/RequestUserServerDto';
import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';

@Controller('/api/user-servers')
export class UserServerController {
  constructor(private userServerService: UserServerService) {}

  @Get('/users/:id')
  getUserById(@Param('id') userId: number): Promise<UserServer[]> {
    return this.userServerService.getServerListByUserId(userId);
  }

  @Post()
  create(@Body() requestUserServerDto: RequestUserServerDto) {
    return this.userServerService.create(
      requestUserServerDto.userId,
      requestUserServerDto.serverId,
    );
  }
}
