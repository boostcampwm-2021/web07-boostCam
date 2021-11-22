import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Channel])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
