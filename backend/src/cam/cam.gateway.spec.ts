import { Test, TestingModule } from '@nestjs/testing';
import { CamGateway } from './cam.gateway';
import { CamInnerService } from './cam-inner.service';

describe('CamGateway', () => {
  let gateway: CamGateway;
  let service: CamInnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamGateway, CamInnerService],
    }).compile();

    gateway = module.get<CamGateway>(CamGateway);
    service = module.get<CamInnerService>(CamInnerService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
