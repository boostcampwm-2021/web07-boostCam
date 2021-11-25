type UserData = {
  githubId: string;
  id: string;
  nickname: string;
  profile: string;
};

type ServerData = {
  description: string;
  id: string;
  name: string;
  imgUrl: string;
};

type MyServerData = {
  id: string;
  server: ServerData;
};

type ChannelData = {
  description: string;
  id: string;
  name: string;
};

type CamData = {
  name: string;
  url: string;
};

export type { UserData, ServerData, MyServerData, ChannelData, CamData };
