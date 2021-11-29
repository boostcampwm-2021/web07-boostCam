import styled from 'styled-components';

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

export {
  MessageItemIcon,
  MessageItem,
  MessageItemHeader,
  MessageSender,
  MessageTimelog,
  MessageContents,
  TextareaDiv,
  MessageTextarea,
};
