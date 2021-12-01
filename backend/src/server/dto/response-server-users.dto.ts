import { ApiProperty } from '@nestjs/swagger';
import { Server } from '../../server/server.entity';
import { UserDto } from '../../user/user.dto';

class ServerWithUsersDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imgUrl: string;

  @ApiProperty()
  users: UserDto[];

  constructor(
    description: string,
    name: string,
    imgUrl: string,
    users: UserDto[],
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
      server.userServer.map((userServer) =>
        UserDto.newInstance(
          userServer.user.id,
          userServer.user.nickname,
          userServer.user.profile,
        ),
      ),
    );
  }
}

export default ServerWithUsersDto;
