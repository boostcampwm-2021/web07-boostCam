import { MediaConnection } from 'peerjs';

type Status = { video: boolean; audio: boolean; stream: boolean };
type Screen = { userId: string; stream: MediaStream; call: MediaConnection };
type UserInfo = {
  roomId: number | null;
  nickname: string | null;
};

export type { Status, Screen, UserInfo };
