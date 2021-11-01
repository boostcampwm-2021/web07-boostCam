import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamChattingModule } from './camchatting.module';
import { CamGateway } from './cam.gateway';
import { CamChattingGateway } from './cam-chatting.gateway';

@Module({
  imports: [CamChattingModule],
  controllers: [AppController],
  providers: [AppService, CamGateway],
})
export class AppModule {}
