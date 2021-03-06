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
import { HttpStatus } from '@nestjs/common';
import { v4 } from 'uuid';

const mockUserServerRepository = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  findByUserIdAndServerId: jest.fn(),
  deleteByUserIdAndServerId: jest.fn(),
  getServerListByUserId: jest.fn(),
  findWithServerOwner: jest.fn(),
  findByCode: jest.fn(),
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
  const userServerId = 2;

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
    it('???????????? ?????? ????????? ??????', async () => {
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(server);
      userServerRepository.findByUserIdAndServerId.mockResolvedValue(undefined);

      const newUserServerId = await service.create(user, server.code);

      expect(newUserServerId).toBe(userServerId);
    });

    it('????????? ???????????? ?????? ??????', async () => {
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(undefined);

      try {
        await service.create(user, v4());
      } catch (error) {
        expect(error.response.message).toBe('???????????? ?????? ???????????????.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('?????? ????????? ????????? ??????', async () => {
      userServerRepository.save.mockResolvedValue(userServer);
      serverRepository.findOne.mockResolvedValue(server);
      userServerRepository.findByUserIdAndServerId.mockResolvedValue(
        existUserServer,
      );

      try {
        await service.create(user, server.code);
      } catch (error) {
        expect(error.response.message).toBe('?????? ????????? ???????????????.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('deleteById()', () => {
    it('???????????? id??? ????????? ??????', async () => {
      const userNotOwner = 0;
      const existsId = existUserServerId;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = existsId == existUserServer.id ? 1 : 0;
      userServerRepository.delete.mockResolvedValue(returnedDeleteResult);
      userServerRepository.findWithServerOwner.mockResolvedValue(userServer);

      const deleteResult: DeleteResult = await service.deleteById(
        existsId,
        userNotOwner,
      );

      expect(deleteResult.affected).toBe(1);
    });

    it('???????????? ?????? id??? ????????? ??????', async () => {
      const userNotOwner = 0;
      const nonExistsId = 0;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = nonExistsId == existUserServer.id ? 1 : 0;
      userServerRepository.delete.mockResolvedValue(returnedDeleteResult);
      userServerRepository.findWithServerOwner.mockResolvedValue(userServer);

      const deleteResult: DeleteResult = await service.deleteById(
        nonExistsId,
        userNotOwner,
      );

      expect(deleteResult.affected).toBe(0);
    });

    it('?????? ???????????? ????????? ????????? ??????', async () => {
      const nonExistsId = 0;
      const returnedDeleteResult = new DeleteResult();
      returnedDeleteResult.affected = nonExistsId == existUserServer.id ? 1 : 0;
      userServerRepository.findWithServerOwner.mockResolvedValue(userServer);

      try {
        await service.deleteById(nonExistsId, userId);
      } catch (error) {
        expect(error.response.message).toBe(
          '?????? ???????????? ???????????? ?????? ??? ????????????.',
        );
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('getServerListByUserId()', () => {
    it('list??? ????????? ??????', async () => {
      userServerRepository.getServerListByUserId.mockResolvedValue([
        existUserServer,
        existUserServer,
      ]);

      const userServerList = await service.getServerListByUserId(userId);

      expect(userServerList[0].id).toBe(existUserServer.id);
      expect(userServerList[0].server).toBe(existUserServer.server);
    });
  });

  const refreshVariables = () => {
    user = new User();
    user.id = userId;

    server = new Server();
    server.id = serverId;
    server.owner = user;
    server.code = v4();

    userServer = new UserServer();
    userServer.id = userServerId;
    userServer.user = user;
    userServer.server = server;

    existUserServer = new UserServer();
    existUserServer.id = existUserServerId;
    existUserServer.user = user;
    existUserServer.server = server;
  };
});
