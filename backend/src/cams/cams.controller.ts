import { Controller, UseGuards } from '@nestjs/common';

import { LoginGuard } from '../login/login.guard';

@Controller('/api/cams')
@UseGuards(LoginGuard)
export class CamsController {
  //   @Post(':name') async createCams(@Param('name') name: string) {}
}
