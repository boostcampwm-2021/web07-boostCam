import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChattingModule } from './chatting.module';
import { CamGateway } from './cam.gateway';

@Module({
  imports: [ChattingModule],
  controllers: [AppController],
  providers: [AppService, CamGateway],
})
export class AppModule {}
