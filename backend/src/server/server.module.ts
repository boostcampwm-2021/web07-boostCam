import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { UserServerModule } from '../user-server/user-server.module';
import { ImageModule } from '../image/image.module';
import { ServerRepository } from './server.repository';
import { CamModule } from '../cam/cam.module';

@Module({
  imports: [
    ImageModule,
    forwardRef(() => UserServerModule),
    TypeOrmModule.forFeature([User, ServerRepository]),
    CamModule,
  ],
  providers: [ServerService],
  controllers: [ServerController],
  exports: [ServerService],
})
export class ServerModule {}
