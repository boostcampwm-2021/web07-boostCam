import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerModule } from '../user-server/user-server.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Channel, UserServer]),
    UserServerModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
