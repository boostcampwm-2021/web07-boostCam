import { Test, TestingModule } from '@nestjs/testing';
import { ChattingGateway } from './chatting.gateway';

describe('ChattingGateway', () => {
  let gateway: ChattingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChattingGateway],
    }).compile();

    gateway = module.get<ChattingGateway>(ChattingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
