import React, { useState } from 'react';

const sendMessage = async (channelId: number, contents: string) => {
  const requestBody = {
    channelId,
    contents,
  };

  const response = await fetch('/api/messages', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseBody = await response.json();
  return responseBody;
};

function Message(): JSX.Element {
  const [contents, setContents] = useState('');

  const sendMessageToChannel = () => {
    const channelIdParam = new URLSearchParams(window.location.search).get('channelId');
    if (!channelIdParam) {
      return;
    }
    const channelId = parseInt(channelIdParam, 10);
    sendMessage(channelId, contents);
    setContents('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    sendMessageToChannel();
  };

  const onButtonClick = () => {
    sendMessageToChannel();
  };

  return (
    <div>
      <input onChange={onInputChange} onKeyDown={onInputKeyDown} placeholder="message를 입력하세요." value={contents} />
      <button type="button" onClick={onButtonClick}>
        입력
      </button>
    </div>
  );
}

export default Message;
