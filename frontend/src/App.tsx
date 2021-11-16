import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginMain from './components/LoginPage/LoginMain';
import Cam from './components/Cam/Cam';
import CamRooms from './components/Main/CamRooms';
import BoostCamMain from './components/Main/BoostCamMain';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginMain />} />
          <Route path="/main" element={<BoostCamMain />} />
          <Route path="/cam" element={<Cam />} />
          <Route path="/camroom" element={<CamRooms />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
