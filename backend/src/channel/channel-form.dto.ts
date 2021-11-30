import { ApiProperty } from '@nestjs/swagger';

export class ChannelFormDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  serverId: number;
}
