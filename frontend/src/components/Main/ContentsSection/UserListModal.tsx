import React from 'react';
import styled from 'styled-components';

import { User } from '../../../types/user';

const Container = styled.div`
  width: 90%;
  height: 70%;
  margin-left: 25px;
  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  color: #e5e0d8;

  flex: 4;

  overflow-y: auto;

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

const ModalUserListItem = styled.div`
  width: 90%;
  padding: 15px 10px;
  margin: 3px 0px 0px 0px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 18px;

  border-top: 1px solid #e5e0d8;

  &:last-child {
    border-bottom: 1px solid #e5e0d8;
  }

  &:hover {
    button {
      visibility: visible;
    }
    background-color: #282929;
  }

  button {
    visibility: hidden;
  }
`;

const ItemIcon = styled.div<{ imgUrl: string }>`
  width: 36px;
  height: 36px;
  margin: 10px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`;

const ItemName = styled.span`
  margin-left: 15px;
  font-size: 20px;
  font-weight: 600;
`;

type UserListModalProps = {
  userList: User[];
};

function UserListModal(props: UserListModalProps): JSX.Element {
  const { userList } = props;

  const userListElements = () => {
    return userList.map((data) => {
      return (
        <ModalUserListItem key={data.githubId}>
          <ItemIcon imgUrl={data.profile} />
          <ItemName>{data.nickname}</ItemName>
        </ModalUserListItem>
      );
    });
  };

  return <Container>{userListElements()}</Container>;
}

export default UserListModal;
