import { Module } from '@nestjs/common';
import { ChattingGateway } from './chatting.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChattingGateway],
})
export class ChattingModule {}
