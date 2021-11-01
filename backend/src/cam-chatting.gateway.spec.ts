import { Test, TestingModule } from '@nestjs/testing';
import { CamChattingGateway } from './cam-chatting.gateway';

describe('CamChattingGateway', () => {
  let gateway: CamChattingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamChattingGateway],
    }).compile();

    gateway = module.get<CamChattingGateway>(CamChattingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
