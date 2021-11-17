import { MediaConnection } from 'peerjs';

type Status = { video: boolean; audio: boolean; stream: boolean; speaking: boolean };
type Screen = { userId: string; stream: MediaStream; call: MediaConnection };
type UserInfo = {
  roomId: string | null;
  nickname: string | null;
};

export type { Status, Screen, UserInfo };
