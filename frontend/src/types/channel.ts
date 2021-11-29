import { ServerEntity } from './server';
import { UserEntity } from './user';

type ChannelEntity = {
  id: number;
  name: string;
  description: string;
  owner: UserEntity;
  server: ServerEntity;
  ownerId: number;
  serverId: number;
};

export default ChannelEntity;
