import React from 'react';
import styled from 'styled-components';

import OAuthLogin from './OAuthLogin';
import boostCamIcon from '../../assets/icons/cover_new.png';
import { flex } from '../../utils/styledComponentFunc';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #492148;
  ${flex('column', 'space-between', 'center')}
`;

const LoginBox = styled.div`
  min-width: 500px;
  min-height: 600px;
  background-color: white;
  border-radius: 20px;
  margin: 30px 0px;
  padding: 30px 0px;
  ${flex('column', 'space-around', 'center')}
`;

const WelcomeMessage = styled.span`
  font-size: 30px;
  color: black;
`;

const Im = styled.img`
  height: 200px;
`;
function LoginMain(): JSX.Element {
  return (
    <Container>
      <LoginBox>
        <WelcomeMessage>Welcome to boostCam!</WelcomeMessage>
        <Im src={boostCamIcon} />
        <OAuthLogin />
      </LoginBox>
    </Container>
  );
}

export default LoginMain;
