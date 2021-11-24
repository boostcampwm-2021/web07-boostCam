import { Server } from '../../server/server.entity';

type UserInfo = {
  nickname: string;
  profile: string;
};

class ServerWithUsersDto {
  description: string;
  name: string;
  imgUrl: string;
  users: UserInfo[];

  constructor(
    description: string,
    name: string,
    imgUrl: string,
    users: UserInfo[],
  ) {
    this.description = description;
    this.name = name;
    this.imgUrl = imgUrl;
    this.users = users;
  }

  static fromEntity(server: Server) {
    return new ServerWithUsersDto(
      server.description,
      server.name,
      server.imgUrl,
      server.userServer.map((userServer) => {
        return {
          nickname: userServer.user.nickname,
          profile: userServer.user.profile,
        };
      }),
    );
  }
}

export default ServerWithUsersDto;
