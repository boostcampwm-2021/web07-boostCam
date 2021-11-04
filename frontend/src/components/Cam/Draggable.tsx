import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

type DraggableProps = {
  children: React.ReactChild | React.ReactChild[];
  defaultPosition: {
    x: string;
    y: string;
    childHeight: string;
    childWidth: string;
  };
  isActive: boolean;
};

const Container = styled.div<{ width: string; height: string; isActive: boolean }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #c4c4c4;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid red;
  &:hover {
    cursor: pointer;
  }
`;

function Draggable(props: DraggableProps): JSX.Element {
  const { children, defaultPosition, isActive } = props;
  const { x, y, childHeight, childWidth } = defaultPosition;

  const draggableRef = useRef<HTMLDivElement>(null);

  let mouseDownStatus = false;
  let offsetX = 0;
  let offsetY = 0;

  useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current.style.left = x;
      draggableRef.current.style.top = y;
      draggableRef.current.addEventListener('mousedown', (e) => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        mouseDownStatus = true;
      });
      draggableRef.current.addEventListener('mouseup', () => {
        mouseDownStatus = false;
      });
      draggableRef.current.addEventListener('mouseleave', () => {
        mouseDownStatus = false;
      });
      draggableRef.current.addEventListener('mousemove', (e) => {
        if (mouseDownStatus && draggableRef.current) {
          draggableRef.current.style.left = (e.x - offsetX).toString().concat('px');
          draggableRef.current.style.top = (e.y - offsetY).toString().concat('px');
        }
      });
    }
  }, []);

  return (
    <Container ref={draggableRef} width={childWidth} height={childHeight} isActive={isActive}>
      {children}
    </Container>
  );
}

export default Draggable;
