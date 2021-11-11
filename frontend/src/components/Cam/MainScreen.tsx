import React, { useContext } from 'react';
import styled from 'styled-components';

import { ToggleStoreContext } from './ToggleStore';
import SharedScreen from './SharedScreen';
import { CamStoreContext } from './CamStore';
import ScreenRow from './ScreenRow';
import type { Screen } from '../../types/cam';

const Container = styled.div<{ activeTab: string[]; isMouseOnCamPage: boolean }>`
  width: ${(props) => props.activeTab[0]};
  height: ${(props) => (props.isMouseOnCamPage ? '90vh' : '98vh')};
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.5s ease;
`;

const getScreenListOfRows = (screenListInfo: Array<Screen>) => {
  const screenListOfRows: Array<Array<Screen>> = [];
  const maxColumns = screenListInfo.length >= 4 ? 3 : 2;
  let screenListOfRow: Array<Screen> = [];
  let beforeRow = 0;

  screenListInfo.forEach((screen, index) => {
    const currentRow = Math.floor((index + 1) / maxColumns);

    if (beforeRow !== currentRow) {
      beforeRow = currentRow;
      screenListOfRows.push(screenListOfRow);
      screenListOfRow = [];
    }
    screenListOfRow.push(screen);
  });
  if (screenListOfRow.length !== 0) {
    screenListOfRows.push(screenListOfRow);
  }
  return screenListOfRows;
};

function MainScreen(): JSX.Element {
  const { screenList } = useContext(CamStoreContext);
  const screenListOfRows = getScreenListOfRows(screenList);
  const { isChattingTabActive, isMouseOnCamPage, isScreenShareActive, screenStream } = useContext(ToggleStoreContext);

  const countActiveTab = (): string[] => {
    if (isChattingTabActive) return ['70vw', '98vw'];
    return ['98vw', '70vw'];
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.currentTarget.style.animation = 'none';
  };

  if (isScreenShareActive) {
    return (
      <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} isMouseOnCamPage={isMouseOnCamPage}>
        <SharedScreen stream={screenStream} />
      </Container>
    );
  }

  return (
    <Container activeTab={countActiveTab()} onAnimationEnd={handleAnimationEnd} isMouseOnCamPage={isMouseOnCamPage}>
      {screenListOfRows.length === 0 ? <ScreenRow screenListOfRow={[]} rowIndex={0} numOfRows={1} /> : ''}
      {screenListOfRows.map((screenListOfRow: Array<Screen>, index) => {
        return (
          <ScreenRow
            key={Math.random()}
            screenListOfRow={screenListOfRow}
            rowIndex={index}
            numOfRows={screenListOfRows.length}
          />
        );
      })}
    </Container>
  );
}

export default MainScreen;
