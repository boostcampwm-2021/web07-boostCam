import { MessageSender } from './message';

type CommentRequestBody = {
  channelId: number;
  messageId: number;
  contents: string;
};

type CommentData = {
  id: number;
  messageId: string;
  channelId: number;
  contents: string;
  createdAt: string;
  sender: MessageSender;
};

type CommentListInfo = {
  commentData: CommentData[];
  isLoading: boolean;
};

export type { CommentRequestBody, CommentData, CommentListInfo };
