import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerRepository } from '../user-server/user-server.repository';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import RequestServerDto from './dto/request-server.dto';
import { Server } from './server.entity';
import { ServerRepository } from './server.repository';
import { ServerService } from './server.service';

const mockUserServerRepository = () => ({
  save: jest.fn(),
  delete: jest.fn(),
  findByUserIdAndServerId: jest.fn(),
  deleteByUserIdAndServerId: jest.fn(),
  getServerListByUserId: jest.fn(),
});

const mockServerRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  findOneWithUsers: jest.fn(),
  findOneWithOwner: jest.fn(),
  delete: jest.fn(),
});

type MockUserServerRepository = Partial<
  Record<keyof UserServerRepository, jest.Mock>
>;
type MockServerRepository = Partial<Record<keyof ServerRepository, jest.Mock>>;

describe('ServerService', () => {
  let serverService: ServerService;
  let serverRepository: MockServerRepository;
  let userServerRepository: MockUserServerRepository;
  let user: User;
  let requestServerDto: RequestServerDto;
  let newServer: Server;
  let newUserServer: UserServer;
  let existsServer: Server;
  let existsUserServer: UserServer;

  const existsServerId = 1;
  const userId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServerService,
        {
          provide: getRepositoryToken(ServerRepository),
          useValue: mockServerRepository(),
        },
        UserServerService,
        {
          provide: getRepositoryToken(UserServerRepository),
          useValue: mockUserServerRepository(),
        },
      ],
    }).compile();

    serverService = module.get<ServerService>(ServerService);
    serverRepository = module.get<MockServerRepository>(
      getRepositoryToken(ServerRepository),
    );
    userServerRepository = module.get<MockUserServerRepository>(
      getRepositoryToken(UserServerRepository),
    );

    refreshVariables();
  });

  describe('create()', () => {
    it('정상적인 값을 저장할 경우', async () => {
      serverRepository.save.mockResolvedValue(newServer);
      serverRepository.findOne.mockResolvedValue(newServer);
      userServerRepository.findByUserIdAndServerId.mockResolvedValue(undefined);
      userServerRepository.save.mockResolvedValue(newUserServer);

      const createdServer = await serverService.create(
        user,
        requestServerDto,
        '',
      );

      expect(createdServer.name).toBe(requestServerDto.name);
      expect(createdServer.description).toBe(requestServerDto.description);
      expect(createdServer.owner.id).toBe(user.id);
    });
  });

  describe('findOneWithUsers()', () => {
    it('정상적인 값을 입력할 경우', async () => {
      serverRepository.findOneWithUsers.mockResolvedValue(existsServer);

      const serverWithUseres = await serverService.findOneWithUsers(
        existsServerId,
      );

      expect(serverWithUseres.name).toBe(existsServer.name);
      expect(serverWithUseres.description).toBe(existsServer.description);
    });
  });

  describe('deleteServer()', () => {
    it('정상적인 값을 입력할 경우', async () => {
      const deleteResult = new DeleteResult();
      deleteResult.affected = 1;
      serverRepository.findOneWithOwner.mockResolvedValue(existsServer);
      serverRepository.delete.mockResolvedValue(deleteResult);

      const result = await serverService.deleteServer(existsServerId, user);

      expect(result.affected).toBe(deleteResult.affected);
    });

    it('서버가 존재하지 않을 경우', async () => {
      const nonExistsId = 0;
      serverRepository.findOneWithOwner.mockResolvedValue(undefined);

      try {
        await serverService.deleteServer(nonExistsId, user);
      } catch (error) {
        expect(error.response.message).toBe('존재하지 않는 서버입니다.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('삭제 권한이 없을 경우', async () => {
      const userNotOwner = new User();
      userNotOwner.id = 0;
      serverRepository.findOneWithOwner.mockResolvedValue(existsServer);

      try {
        await serverService.deleteServer(existsServerId, userNotOwner);
      } catch (error) {
        expect(error.response.message).toBe('삭제 권한이 없습니다.');
        expect(error.response.error).toBe('Forbidden');
        expect(error.response.statusCode).toBe(HttpStatus.FORBIDDEN);
      }
    });
  });

  const refreshVariables = () => {
    const serverName = 'server name';
    const serverDescription = 'server description';

    user = new User();
    user.id = userId;
    requestServerDto = new RequestServerDto(serverName, serverDescription);
    newServer = new Server();
    newServer.description = serverDescription;
    newServer.name = serverName;
    newServer.owner = user;

    existsUserServer = new UserServer();
    existsUserServer.id = 1;
    existsUserServer.user = user;

    existsServer = new Server();
    existsServer.id = existsServerId;
    existsServer.owner = user;
    existsServer.userServer = [existsUserServer];
  };
});
