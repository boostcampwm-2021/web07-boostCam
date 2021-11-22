import { MediaConnection } from 'peerjs';

type Status = { video: boolean; audio: boolean; stream: boolean; speaking: boolean };
type Screen = { userId: string; stream: MediaStream; call: MediaConnection };
type UserInfo = {
  roomId: string | null;
  nickname: string | null;
};
type Control = {
  video: boolean;
  audio: boolean;
};

export type { Status, Screen, UserInfo, Control };
