import { Test, TestingModule } from '@nestjs/testing';
import { CamController } from './cam.controller';

describe('CamController', () => {
  let controller: CamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamController],
    }).compile();

    controller = module.get<CamController>(CamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
