import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ormConfig from './config/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamModule } from './cam/cam.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    CamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
