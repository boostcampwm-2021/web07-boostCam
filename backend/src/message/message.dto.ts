import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';
import { Message } from './message.entity';

export class MessageDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  contents: string;
  @ApiProperty()
  channelId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  sender: UserDto;

  static newInstance(
    id: number,
    contents: string,
    channelId: number,
    createdAt: Date,
    sender: UserDto,
  ) {
    const newInstance = new MessageDto();
    newInstance.id = id;
    newInstance.contents = contents;
    newInstance.channelId = channelId;
    newInstance.createdAt = createdAt;
    newInstance.sender = sender;
    return newInstance;
  }

  static fromEntity(message: Message) {
    return MessageDto.newInstance(
      message.id,
      message.contents,
      message.channelId,
      message.createdAt,
      UserDto.fromEntity(message.sender),
    );
  }
}
