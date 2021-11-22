import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';
import { User } from '../user/user.entity';
import { Server } from '../server/server.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { DeleteResult, Repository } from 'typeorm';

const mockRepository = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  deleteByUserIdAndServerId: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserServerService', () => {
  let service: UserServerService;
  let repository: MockRepository<UserServer>;
  let userServer: UserServer;
  let existUserServer: UserServer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServerService,
        {
          provide: getRepositoryToken(UserServerRepository),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UserServerService>(UserServerService);
    repository = module.get<MockRepository<UserServer>>(
      getRepositoryToken(UserServerRepository),
    );

    userServer = new UserServer();
    userServer.user = new User();
    userServer.server = new Server();

    existUserServer = new UserServer();
    existUserServer.id = 1;
    existUserServer.user = new User();
    existUserServer.user.id = 1;
    existUserServer.server = new Server();
    existUserServer.server.id = 1;
  });

  describe('create()', () => {
    it('정상적인 값을 저장할 경우', async () => {
      repository.save.mockResolvedValue(userServer);
      const newUserServer = await service.create(userServer);

      expect(newUserServer.user).toBe(userServer.user);
      expect(newUserServer.server).toBe(userServer.server);
    });
  });

  describe('deleteById()', () => {
    it('존재하는 id로 삭제할 경우', async () => {
      const existsId = existUserServer.id;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = existsId == existUserServer.id ? 1 : 0;
      repository.delete.mockResolvedValue(returnedDeleteResult);

      const deleteResult: DeleteResult = await service.deleteById(existsId);

      expect(deleteResult.affected).toBe(1);
    });

    it('존재하지 않는 id로 삭제할 경우', async () => {
      const nonExistsId = 0;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = nonExistsId == existUserServer.id ? 1 : 0;
      repository.delete.mockResolvedValue(returnedDeleteResult);

      const deleteResult: DeleteResult = await service.deleteById(nonExistsId);

      expect(deleteResult.affected).toBe(0);
    });
  });
});
