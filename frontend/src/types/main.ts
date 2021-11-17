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
  owner: UserData;
};

type ChannelData = {
  description: string;
  id: string;
  name: string;
  server: ServerData;
};

export type { UserData, ServerData, ChannelData };