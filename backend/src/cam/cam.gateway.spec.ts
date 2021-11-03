import { Test, TestingModule } from '@nestjs/testing';
import { CamGateway } from './cam.gateway';

describe('CamGateway', () => {
  let gateway: CamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamGateway],
    }).compile();

    gateway = module.get<CamGateway>(CamGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
