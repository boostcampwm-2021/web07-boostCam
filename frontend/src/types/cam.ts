import { MediaConnection } from 'peerjs';
import CurrentDate from './date';

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

type CamMessageInfo = {
  msg: string;
  room: string | null;
  user: string;
  date: CurrentDate;
};

type CamRoomInfo = {
  socketId: string;
  userNickname: string;
};

export type { Status, Screen, UserInfo, Control, CamMessageInfo, CamRoomInfo };
