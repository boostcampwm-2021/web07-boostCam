import { Module } from '@nestjs/common';
import { CamChattingController } from './camchatting.controller';
import { CamChattingService } from './camchatting.service';
import { CamChattingGateway } from './cam-chatting.gateway';

@Module({
  imports: [],
  controllers: [CamChattingController],
  providers: [CamChattingService, CamChattingGateway],
})
export class CamChattingModule {}
