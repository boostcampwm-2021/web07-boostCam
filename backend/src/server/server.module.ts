import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Server } from './server.entity';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { UserServerModule } from '../user-server/user-server.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    ImageModule,
    forwardRef(() => UserServerModule),
    TypeOrmModule.forFeature([User, Server]),
  ],
  providers: [ServerService],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule {}
