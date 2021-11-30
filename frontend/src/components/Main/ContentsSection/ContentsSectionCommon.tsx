import styled from 'styled-components';
import { MessageData } from '../../../types/message';
import getCurrentDate from '../../../utils/getCurrentDate';

type CallbackFunc = {
  (contents: string): Promise<void>;
};

const MessageItemIcon = styled.div<{ imgUrl: string }>`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const MessageItem = styled.div`
  width: 90%;
  padding: 8px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MessageItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MessageSender = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const MessageTimelog = styled.span`
  font-size: 12px;
  margin-left: 15px;
`;

const MessageContents = styled.span`
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

const MessageTextarea = styled.textarea`
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

export const messageInnerElement = (data: MessageData): JSX.Element => {
  const { contents, createdAt, sender } = data;
  const { nickname, profile } = sender;
  const dateObj = getCurrentDate(new Date(createdAt));
  const date = `${dateObj.year}-${dateObj.month}-${dateObj.date} ${dateObj.hour}:${dateObj.minutes}`;
  return (
    <>
      <MessageItemIcon imgUrl={profile} />
      <MessageItem>
        <MessageItemHeader>
          <MessageSender> {nickname} </MessageSender>
          <MessageTimelog>{date}</MessageTimelog>
        </MessageItemHeader>
        <MessageContents>{contents}</MessageContents>
      </MessageItem>
    </>
  );
};

export const onKeyDownMessageTextarea = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  ref: React.RefObject<HTMLDivElement>,
  callback: CallbackFunc,
): void => {
  const { key, currentTarget, shiftKey } = e;
  const msg = currentTarget.value.trim();
  const divRef = ref.current;

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
      callback(currentTarget.value);
      currentTarget.value = '';
    }
    currentTarget.style.height = '21px';
    if (divRef) divRef.style.height = `105px`;
  }
};

export { TextareaDiv, MessageTextarea };
