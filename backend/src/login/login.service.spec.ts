import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import githubConfig from '../config/github.config';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const githubConfig = {
      clientID: 'string',
      clientSecret: 'string',
      callbackURL: 'string',
    };

    service = new LoginService(githubConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
