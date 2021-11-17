import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginMain from './components/LoginPage/LoginMain';
import Cam from './components/Cam/Cam';
import CamRooms from './components/Main/CamRooms';
import TmpFrame from './components/Server/TmpFrame';
import BoostCamMain from './components/Main/BoostCamMain';
import LoginCallback from './components/LoginPage/LoginCallback';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginMain />} />
          <Route path="/main" element={<BoostCamMain />} />
          <Route path="/login/github" element={<LoginCallback service="github" />} />
          <Route path="/cam" element={<Cam />} />
          <Route path="/serverTmp" element={<TmpFrame />} />
          <Route path="/camroom" element={<CamRooms />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
