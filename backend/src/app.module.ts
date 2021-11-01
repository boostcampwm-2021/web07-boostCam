import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamGateway } from './cam.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CamGateway],
})
export class AppModule {}
