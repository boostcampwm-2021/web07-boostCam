import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChattingSectionHeader = styled.div`
  width: 100%;
  flex: 1 1 0;
  max-height: 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid gray;
`;

const ChannelName = styled.div`
  margin-left: 15px;
  padding: 8px 12px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChannelUserButton = styled.div`
  margin-right: 15px;
  padding: 3px 5px;
  border: 1px solid gray;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChattingSectionBody = styled.div`
  width: 100%;
  flex: 5 1 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

const ChattingItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:hover {
    background-color: #f0e7e7;
  }
`;

const ChattingItemIcon = styled.div`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-color: indigo;
  border-radius: 8px;
`;

const ChattingItem = styled.div`
  width: 90%;
  padding: 8px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChattingItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ChattingSender = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const ChattingTimelog = styled.span`
  font-size: 12px;
  margin-left: 15px;
`;

const ChattingContents = styled.span`
  font-size: 15px;
`;

const TextareaDiv = styled.div`
  min-height: 105px;
  max-height: 250px;
  background-color: #ece9e9;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ChatTextarea = styled.textarea`
  width: 90%;
  height: 22px;
  max-height: 200px;
  border: none;
  outline: none;
  resize: none;
  background: none;

  font-size: 15px;

  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;

  background-color: white;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #cccccc;
    border-radius: 10px;
  }
`;

function ChattingSection(): JSX.Element {
  const tmpAry = new Array(15).fill('value');
  const textDivRef = useRef<HTMLDivElement>(null);
  const tmpChannelName = '# ChannelName';

  const onKeyDownChatTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, currentTarget, shiftKey } = e;
    const msg = currentTarget.value.trim();
    const divRef = textDivRef.current;

    currentTarget.style.height = '15px';
    currentTarget.style.height = `${currentTarget.scrollHeight - 15}px`;
    if (divRef) {
      divRef.style.height = `105px`;
      divRef.style.height = `${90 + currentTarget.scrollHeight - 27}px`;
    }

    if (!shiftKey && key === 'Enter') {
      e.preventDefault();
      if (!msg.length) currentTarget.value = '';
      else {
        console.log(msg);
        currentTarget.value = '';
      }
      currentTarget.style.height = '21px';
      if (divRef) divRef.style.height = `105px`;
    }
  };

  const tmpChattingItems = tmpAry.map((val: string, idx: number): JSX.Element => {
    const key = `${val}-${idx}`;
    const tmp = new Array(idx).fill('chatting');
    const contents = tmp.reduce((acc, va) => {
      return `${acc}-${va}`;
    }, '');
    return (
      <ChattingItemBlock key={key}>
        <ChattingItemIcon />
        <ChattingItem>
          <ChattingItemHeader>
            <ChattingSender> Sender {idx}</ChattingSender>
            <ChattingTimelog>Timestamp</ChattingTimelog>
          </ChattingItemHeader>
          <ChattingContents>
            `${contents}-${idx}`
          </ChattingContents>
        </ChattingItem>
      </ChattingItemBlock>
    );
  });

  return (
    <Container>
      <ChattingSectionHeader>
        <ChannelName>{tmpChannelName}</ChannelName>
        <ChannelUserButton>Users 5</ChannelUserButton>
      </ChattingSectionHeader>
      <ChattingSectionBody>{tmpChattingItems}</ChattingSectionBody>
      <TextareaDiv ref={textDivRef}>
        <ChatTextarea onKeyDown={onKeyDownChatTextarea} />
      </TextareaDiv>
    </Container>
  );
}

export default ChattingSection;
