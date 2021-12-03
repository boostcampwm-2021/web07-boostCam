import { Channel } from '../channel.entity';

class ChannelResponseDto {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  serverId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    ownerId: number,
    serverId: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ownerId = ownerId;
    this.serverId = serverId;
  }

  static fromEntity(channel: Channel) {
    return new ChannelResponseDto(
      channel.id,
      channel.name,
      channel.description,
      channel.ownerId,
      channel.serverId,
    );
  }
}

export default ChannelResponseDto;
