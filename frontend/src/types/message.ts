type MessageRequestBody = {
  channelId: string;
  contents: string;
};

type MessageSender = {
  id: string;
  nickname: string;
  profile: string;
};

type MessageData = {
  id: string;
  channelId: string;
  contents: string;
  createdAt: string;
  sender: MessageSender;
};

type MessageListInfo = {
  messageData: MessageData[];
  isLoading: boolean;
};

export type { MessageRequestBody, MessageSender, MessageData, MessageListInfo };
