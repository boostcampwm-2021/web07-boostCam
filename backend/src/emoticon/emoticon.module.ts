import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Emoticon } from './emoticon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emoticon])],
})
export class EmoticonModule {}
