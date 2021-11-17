import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ormConfig from './config/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamModule } from './cam/cam.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { EmoticonModule } from './emoticon/emoticon.module';
import { ServerModule } from './server/server.module';
import { CamsModule } from './cams/cams.module';
import { LoginModule } from './login/login.module';
import githubConfig from './config/github.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [githubConfig],
      envFilePath: ['.env', '.env.github'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    CamModule,
    UserModule,
    CommentModule,
    ChannelModule,
    MessageModule,
    EmoticonModule,
    ServerModule,
    CamsModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
