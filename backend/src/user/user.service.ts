import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserServerRepository } from 'src/user-server/user-server.repository';
import { UserServer } from 'src/user-server/user-server.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserServerRepository)
    private userServerRepository: UserServerRepository,
  ) {}

  getServerListByUserId(userId: number): Promise<UserServer[]> {
    return this.userServerRepository.getServerListByUserId(userId);
  }
}
