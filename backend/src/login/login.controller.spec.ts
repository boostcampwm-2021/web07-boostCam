import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const githubConfig = {
      clientID: 'string',
      clientSecret: 'string',
      callbackURL: 'string',
    };
    service = new LoginService(githubConfig);
    controller = new LoginController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
