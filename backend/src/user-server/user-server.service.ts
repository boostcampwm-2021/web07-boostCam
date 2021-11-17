import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from './user-server.repository';
import { UserServer } from './user-server.entity';

@Injectable()
export class UserServerService {
  constructor(
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  create(userServer: UserServer): Promise<UserServer> {
    return this.userServerRepository.save(userServer);
  }

  delete(id: number) {
    this.userServerRepository.delete(id);
  }
}
