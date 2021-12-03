type MessageRequestBody = {
  channelId: number;
  contents: string;
};

type MessageSender = {
  id: number;
  nickname: string;
  profile: string;
};

type MessageData = {
  id: number;
  channelId: number;
  contents: string;
  createdAt: string;
  sender: MessageSender;
};

type MessageListInfo = {
  messageData: MessageData[];
  isLoading: boolean;
};

export type { MessageRequestBody, MessageSender, MessageData, MessageListInfo };
