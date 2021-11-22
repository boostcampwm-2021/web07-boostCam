import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserServerRepository } from '../user-server/user-server.repository';
import { UserServerService } from '../user-server/user-server.service';
import { UserController } from './user.controller';

const mockRepository = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  deleteByUserIdAndServerId: jest.fn(),
});

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServerService,
        {
          provide: getRepositoryToken(UserServerRepository),
          useValue: mockRepository(),
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
