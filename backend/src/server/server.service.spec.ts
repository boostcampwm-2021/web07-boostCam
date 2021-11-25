import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerRepository } from '../user-server/user-server.repository';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import RequestServerDto from './dto/request-server.dto';
import { Server } from './server.entity';
import { ServerRepository } from './server.repository';
import { ServerService } from './server.service';
import { v4 } from 'uuid';

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
  update: jest.fn(),
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

  describe('findByCode()', () => {
    it('정상적인 코드로 조회할 경우', async () => {
      serverRepository.findOne.mockResolvedValue(existsServer);

      const server = await serverService.findByCode(existsServer.code);

      expect(server.id).toBe(existsServerId);
      expect(server.description).toBe(existsServer.description);
      expect(server.name).toBe(existsServer.name);
      expect(server.imgUrl).toBe(existsServer.imgUrl);
      expect(server.code).toBe(existsServer.code);
    });

    it('존재하지 않는 코드로 조회할 경우', async () => {
      serverRepository.findOne.mockResolvedValue(existsServer);

      try {
        await serverService.findByCode(v4());
      } catch (error) {
        expect(error.response.message).toBe('존재하지 않는 서버입니다.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('findCode()', () => {
    it('정상적인 값을 입력할 경우', async () => {
      serverRepository.findOne.mockResolvedValue(existsServer);

      const code = await serverService.findCode(existsServerId);

      expect(code).toBe(existsServer.code);
    });

    it('서버가 존재하지 않을 경우', async () => {
      const nonExistsId = 0;
      serverRepository.findOne.mockResolvedValue(undefined);

      try {
        await serverService.findCode(nonExistsId);
      } catch (error) {
        expect(error.response.message).toBe('존재하지 않는 서버입니다.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('refreshCode()', () => {
    it('코드 재생성에 성공할 경우', async () => {
      serverRepository.findOne.mockResolvedValue(existsServer);
      const originCode = existsServer.code;

      const code = await serverService.refreshCode(existsServerId);

      expect(code).not.toBe(originCode);
    });

    it('서버가 존재하지 않을 경우', async () => {
      const nonExistsId = 0;
      serverRepository.findOne.mockResolvedValue(undefined);

      try {
        await serverService.refreshCode(nonExistsId);
      } catch (error) {
        expect(error.response.message).toBe('존재하지 않는 서버입니다.');
        expect(error.response.error).toBe('Bad Request');
        expect(error.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      }
    });
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

  describe('updateServer()', () => {
    it('정상적인 요청을 할 경우', async () => {
      const serverUpdateResult = new UpdateResult();
      serverUpdateResult.affected = 1;

      serverRepository.findOneWithOwner.mockResolvedValue(existsServer);
      serverRepository.update.mockResolvedValue(serverUpdateResult);

      const updateResult: UpdateResult = await serverService.updateServer(
        existsServerId,
        requestServerDto,
        user,
        '',
      );

      expect(updateResult.affected).toBe(1);
    });

    it('변경 권한이 없을 경우', async () => {
      const userNotOwner = new User();
      userNotOwner.id = 0;

      serverRepository.findOneWithOwner.mockResolvedValue(existsServer);

      try {
        await serverService.updateServer(
          existsServerId,
          requestServerDto,
          userNotOwner,
          '',
        );
      } catch (error) {
        expect(error.response.message).toBe('변경 권한이 없습니다.');
        expect(error.response.error).toBe('Forbidden');
        expect(error.response.statusCode).toBe(HttpStatus.FORBIDDEN);
      }
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
    existsServer.code = v4();
  };
});
