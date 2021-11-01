import { Controller, Get } from '@nestjs/common';
import { CamChattingService } from './camchatting.service';

@Controller()
export class CamChattingController {
  constructor(private readonly appService: CamChattingService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
