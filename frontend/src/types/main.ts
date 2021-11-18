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
};

type MyServerData = {
  id: string;
  server: ServerData;
};

type ChannelData = {
  description: string;
  id: string;
  name: string;
  server: ServerData;
};

export type { UserData, ServerData, MyServerData, ChannelData };
