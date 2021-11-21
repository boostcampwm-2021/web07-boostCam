import { UserServerService } from './user-server.service';
import { UserServer } from './user-server.entity';
import { User } from '../user/user.entity';
import { Server } from '../server/server.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { DeleteResult } from 'typeorm';
import { ServerService } from '../server/server.service';
import { ServerRepository } from '../server/server.repository';

const mockUserServerRepository = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  findByUserIdAndServerId: jest.fn(),
  deleteByUserIdAndServerId: jest.fn(),
  getServerListByUserId: jest.fn(),
});

const mockServerRepository = () => ({
  findOne: jest.fn(),
});

type MockUserServerRepository = Partial<
  Record<keyof UserServerRepository, jest.Mock>
>;
type MockServerRepository = Partial<Record<keyof ServerRepository, jest.Mock>>;

describe('UserServerService', () => {
  let service: UserServerService;
  let userServerRepository: MockUserServerRepository;
  let serverRepository: MockServerRepository;
  let userServer: UserServer;
  let existUserServer: UserServer;
  let user: User;
  let server: Server;

  const userId = 1;
  const serverId = 1;
  const existUserServerId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServerService,
        {
          provide: getRepositoryToken(UserServerRepository),
          useValue: mockUserServerRepository(),
        },
        ServerService,
        {
          provide: getRepositoryToken(ServerRepository),
          useValue: mockServerRepository(),
        },
      ],
    }).compile();

    service = module.get<UserServerService>(UserServerService);
    userServerRepository = module.get<MockUserServerRepository>(
      getRepositoryToken(UserServerRepository),
    );
    serverRepository = module.get<MockServerRepository>(
      getRepositoryToken(ServerRepository),
    );
    refreshVariables();
  });

  describe('create()', () => {
    it('정상적인 값을 저장할 경우', async () => {
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(server);
      userServerRepository.findByUserIdAndServerId.mockResolvedValue(undefined);

      const newUserServer = await service.create(user, serverId);

      expect(newUserServer.user).toBe(user);
      expect(newUserServer.server).toBe(server);
    });

    it('해당 서버가 존재하지 않는 경우', async () => {
      const nonExistsId = 0;
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(undefined);

      try {
        await service.create(user, nonExistsId);
      } catch (error) {
        expect(error.response).toBe('해당 서버가 존재하지 않습니다.');
      }
    });

    it('이미 추가된 서버인 경우', async () => {
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(server);
      userServerRepository.findByUserIdAndServerId.mockResolvedValue(
        existUserServer,
      );

      try {
        await service.create(user, serverId);
      } catch (error) {
        expect(error.response).toBe('이미 등록된 서버입니다.');
      }
    });
  });

  describe('deleteById()', () => {
    it('존재하는 id로 삭제할 경우', async () => {
      const existsId = existUserServerId;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = existsId == existUserServer.id ? 1 : 0;
      userServerRepository.delete.mockResolvedValue(returnedDeleteResult);

      const deleteResult: DeleteResult = await service.deleteById(existsId);

      expect(deleteResult.affected).toBe(1);
    });

    it('존재하지 않는 id로 삭제할 경우', async () => {
      const nonExistsId = 0;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = nonExistsId == existUserServer.id ? 1 : 0;
      userServerRepository.delete.mockResolvedValue(returnedDeleteResult);

      const deleteResult: DeleteResult = await service.deleteById(nonExistsId);

      expect(deleteResult.affected).toBe(0);
    });
  });

  describe('getServerListByUserId()', () => {
    it('list를 가져올 경우', async () => {
      userServerRepository.getServerListByUserId.mockResolvedValue([
        existUserServer,
        existUserServer,
      ]);

      const userServerList = await service.getServerListByUserId(userId);

      expect(userServerList[0]).toBe(existUserServer);
    });
  });

  const refreshVariables = () => {
    user = new User();
    user.id = userId;

    server = new Server();
    server.id = serverId;

    userServer = new UserServer();
    userServer.user = user;
    userServer.server = server;

    existUserServer = new UserServer();
    existUserServer.id = existUserServerId;
    existUserServer.user = user;
    existUserServer.server = server;
  };
});
