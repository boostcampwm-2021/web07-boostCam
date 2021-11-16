import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServerRepository } from '../repository/user-server.repository';
import { UserServer } from '../user-server.entity';

@Injectable()
export class UserServerService {
  constructor(
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  getByUserIdWithServerInfo(userId: number): Promise<UserServer[]> {
    return this.userServerRepository.getByUserIdWithServerInfo(userId);
  }
}
