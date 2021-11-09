import { MediaConnection } from 'peerjs';

type Status = { video: boolean; audio: boolean; stream: boolean };
type Screen = { userId: string; stream: MediaStream; call: MediaConnection };

export type { Status, Screen };
