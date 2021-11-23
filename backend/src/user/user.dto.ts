import { User } from './user.entity';

export class UserDto {
  id: number;
  nickname: string;
  profile: string;

  static newInstance(id: number, nickname: string, profile: string) {
    const newInstance = new UserDto();
    newInstance.id = id;
    newInstance.nickname = nickname;
    newInstance.profile = profile;
    return newInstance;
  }

  static fromEntity(user: User): UserDto {
    return UserDto.newInstance(user.id, user.nickname, user.profile);
  }
}
