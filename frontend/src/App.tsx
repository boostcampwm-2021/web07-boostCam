import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cam from './components/Cam/Cam';
import LoginMain from './components/LoginPage/LoginMain';
import CamRooms from './components/Main/CamRooms';
import { UserInfo } from './types/cam';

function App(): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo>({ roomId: null, nickname: null });

  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginMain />} />
          <Route path="/rooms" element={<CamRooms handleUserInfo={setUserInfo} />} />
          <Route path="/cam" element={<Cam userInfo={userInfo} />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
