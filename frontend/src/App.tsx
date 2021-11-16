import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cam from './components/Cam/Cam';
import CamRooms from './components/Main/CamRooms';
import TmpFrame from './components/Server/TmpFrame';

function App(): JSX.Element {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<CamRooms />} />
          <Route path="/cam" element={<Cam />} />
          <Route path="/serverTmp" element={<TmpFrame />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
