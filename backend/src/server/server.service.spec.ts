import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserServer } from '../user-server/user-server.entity';
import { UserServerRepository } from '../user-server/user-server.repository';
import { UserServerService } from '../user-server/user-server.service';
import { User } from '../user/user.entity';
import RequestServerDto from './dto/RequestServerDto';
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
  let existServer: Server;

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
      serverRepository.findOneWithUsers.mockResolvedValue(existServer);

      const serverWithUseres = await serverService.findOneWithUsers(
        existsServerId,
      );

      expect(serverWithUseres).toBe(existServer);
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

    existServer = new Server();
    existServer.id = existsServerId;
  };
});
