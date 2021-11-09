import { Test, TestingModule } from '@nestjs/testing';
import { CamGateway } from './cam.gateway';
import { CamService } from './cam.service';

describe('CamGateway', () => {
  let gateway: CamGateway;
  let service: CamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamGateway, CamService],
    }).compile();

    gateway = module.get<CamGateway>(CamGateway);
    service = module.get<CamService>(CamService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
