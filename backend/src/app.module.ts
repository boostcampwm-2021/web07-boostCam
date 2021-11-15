import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamModule } from './cam/cam.module';

@Module({
  imports: [CamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
