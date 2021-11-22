type Status = {
  video: boolean;
  audio: boolean;
  stream: boolean;
  speaking: boolean;
};
type CurrentDate = {
  year: number;
  month: number;
  date: number;
  hour: number;
  minutes: number;
};

type MessageInfo = {
  msg: string;
  room: string | null;
  user: string;
  date: CurrentDate;
};

type CamMap = {
  userId: string;
  socketId: string;
  userNickname: string;
  status: Status;
};

export type { Status, MessageInfo, CamMap };
