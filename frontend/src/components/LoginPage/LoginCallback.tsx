import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import userState from '../../atoms/user';

import User from '../../types/user';

const Container = styled.div``;

const requestLogin = async (code: string, service: string): Promise<User> => {
  const response = await fetch(`/api/login/${service}?code=${code}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const user: User = await response.json();
  return user;
};

type LoginCallbackProps = {
  service: 'github';
};

function LoginCallback(props: LoginCallbackProps): JSX.Element {
  const { service } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userState);

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (!code) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const user = await requestLogin(code, service);
        setLoggedInUser(user);
        setLoading(false);
        setIsSuccess(true);
      } catch (e) {
        // Go to register page
        if (e instanceof Error && e.message === '404') {
          setIsNewUser(true);
        }
        // Login Fail
        setLoading(false);
        setIsSuccess(false);
      }
    };

    tryLogin();
  }, [code]);

  if (loggedInUser || isSuccess) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <Container>
        <div>로그인 중...</div>
      </Container>
    );
  }

  if (isNewUser) {
    // TO DO: 회원가입 페이지
    return <Navigate to="/" />;
  }

  // Login Fail
  return <Navigate to="/login" />;
}

export default LoginCallback;
