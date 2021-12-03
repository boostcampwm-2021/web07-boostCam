type Server = { id: number; description: string; name: string };
type ServerInfo = {
  id: number;
  server: Server;
};

type ServerEntity = {
  code: string;
  description: string;
  id: number;
  imgUrl: string;
  name: string;
};

export type { ServerInfo, Server, ServerEntity };
