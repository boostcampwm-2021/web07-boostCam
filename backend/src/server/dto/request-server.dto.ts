import { ApiProperty } from '@nestjs/swagger';
import { Server } from '../server.entity';

class RequestServerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  toServerEntity = () => {
    return Server.newInstance(this.description, this.name);
  };
}

export default RequestServerDto;
