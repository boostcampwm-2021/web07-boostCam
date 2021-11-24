import { Test, TestingModule } from '@nestjs/testing';
import { CamController } from './cam.controller';
import { CamInnerService } from './cam-inner.service';

describe('CamController', () => {
  let controller: CamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamController],
      providers: [CamInnerService],
    }).compile();

    controller = module.get<CamController>(CamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
