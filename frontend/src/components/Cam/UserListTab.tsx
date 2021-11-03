import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ isActive: boolean }>`
  width: 18vw;
  height: 90vh;
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

type UserListProps = {
  isUserListTabActive: boolean;
};

function UserListTab(props: UserListProps): JSX.Element {
  const { isUserListTabActive } = props;
  return <Container isActive={isUserListTabActive}>UserListTab</Container>;
}

export default UserListTab;
