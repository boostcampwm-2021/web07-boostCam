import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChattingModule } from './chatting.module';
import { CamModule } from './cam/cam.module';

@Module({
  imports: [ChattingModule, CamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
