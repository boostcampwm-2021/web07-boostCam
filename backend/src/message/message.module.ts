import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerModule } from '../user-server/user-server.module';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      User,
      Channel,
      UserServer,
      MessageRepository,
    ]),
    UserServerModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
