import { MessageSender } from './message';

type CommentRequestBody = {
  channelId: number;
  messageId: number;
  contents: string;
};

type CommentData = {
  id: string;
  channelId: string;
  contents: string;
  createdAt: string;
  sender: MessageSender;
};

export type { CommentRequestBody, CommentData };
