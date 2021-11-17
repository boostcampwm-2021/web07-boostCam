import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
