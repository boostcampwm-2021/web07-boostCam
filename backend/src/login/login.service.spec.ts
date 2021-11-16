import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const githubConfig = {
      clientID: 'string',
      clientSecret: 'string',
      callbackURL: 'string',
    };
    userRepository = null;
    service = new LoginService(githubConfig, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
