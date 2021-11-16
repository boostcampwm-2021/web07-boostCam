import { Repository } from 'typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { User } from '../user/user.entity';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const githubConfig = {
      clientID: 'string',
      clientSecret: 'string',
      callbackURL: 'string',
    };
    repository = null;
    service = new LoginService(githubConfig, repository);
    controller = new LoginController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
