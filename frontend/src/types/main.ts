type UserData = {
  githubId: number;
  id: number;
  nickname: string;
  profile: string;
};

type ServerData = {
  description: string;
  id: number;
  name: string;
  imgUrl: string;
  owner: UserData;
};

type MyServerData = {
  id: number;
  server: ServerData;
};

type ChannelListData = {
  description: string;
  id: number;
  name: string;
  ownerId: number;
  serverId: number;
};

type CamData = {
  name: string;
  url: string;
};

export type { UserData, ServerData, MyServerData, ChannelListData, CamData };
