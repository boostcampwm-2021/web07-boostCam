import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginService } from './login.service';

@Module({
  imports: [ConfigModule],
  providers: [LoginService],
})
export class LoginModule {}
