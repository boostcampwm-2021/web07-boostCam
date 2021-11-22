import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
})
export class MessageModule {}
