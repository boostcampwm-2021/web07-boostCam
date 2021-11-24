import { Controller, Get, UseGuards, Session } from '@nestjs/common';
import { UserServerService } from '../user-server/user-server.service';
import { LoginGuard } from '../login/login.guard';
import { ExpressSession } from '../types/session';
import ResponseEntity from '../common/response-entity';
import UserServerListDto from '../user-server/dto/user-server-list.dto';

@Controller('/api/user')
@UseGuards(LoginGuard)
export class UserController {
  constructor(private userServerService: UserServerService) {}

  @Get('/servers')
  async getServersByUserId(
    @Session()
    session: ExpressSession,
  ): Promise<ResponseEntity<UserServerListDto[]>> {
    const userId = session.user.id;
    const data = await this.userServerService.getServerListByUserId(userId);

    return ResponseEntity.ok(data);
  }

  @Get()
  getUser(@Session() session: ExpressSession) {
    return session.user;
  }
}
