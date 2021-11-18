import React from 'react';
import styled from 'styled-components';
import { Control } from '../../../types/cam';

type ControlMenuProps = {
  control: Control;
  setControl: React.Dispatch<React.SetStateAction<Control>>;
  controlPosition: { x: number; y: number };
};

const Container = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  background-color: white;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  padding: 5px;
  border-radius: 2px;
  box-shadow: 0px 6px 15px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const ControlRow = styled.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
`;

const Hr = styled.div`
  height: 1px;
  width: 100%;
  background-color: gray;
  margin: 2px 0;
`;

function ControlMenu(props: ControlMenuProps): JSX.Element {
  const { control, setControl, controlPosition } = props;

  const toggleAudio = () => {
    setControl((prev) => ({ ...prev, audio: !prev.audio }));
  };

  const toggleVideo = () => {
    setControl((prev) => ({ ...prev, video: !prev.video }));
  };

  return (
    <Container position={controlPosition}>
      <ControlRow onClick={toggleAudio}>
        <div>Audio</div>
        <div>{control.audio ? '✔' : ' '}</div>
      </ControlRow>
      <Hr />
      <ControlRow onClick={toggleVideo}>
        <div>Video</div>
        <div>{control.video ? '✔' : ' '}</div>
      </ControlRow>
    </Container>
  );
}

export default ControlMenu;
