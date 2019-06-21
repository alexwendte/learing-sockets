import * as React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components/macro';
import './reset.css';
import './App.css';

const Draw = () => {
  const cRef = React.useRef<HTMLCanvasElement>();

  let localMouseDown = false;
  let mouseDown = false;

  const [socket] = React.useState(() =>
    socketIOClient('http://localhost:7777')
  );

  socket.on('serverDraw', data => {
    drawFromEvent(data);
  });
  socket.on('serverDrawDelete', () => {
    const ctx = cRef.current.getContext('2d');
    ctx.clearRect(0, 0, 600, 300);
  });
  socket.on('mouseDown', () => (mouseDown = true));
  socket.on('mouseUp', () => (mouseDown = false));

  const handleMouseMove = e => {
    const left = e.pageX - cRef.current.offsetLeft;
    const bottom = e.pageY - cRef.current.offsetTop;

    socket.emit('clientDraw', { left, bottom });
  };

  let [prevX, prevY] = [undefined, undefined];

  let counter = 0;

  const drawFromEvent = ({ left, bottom }) => {
    if (cRef.current) {
      const ctx = cRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(left, bottom);
      if (localMouseDown || mouseDown) {
        counter++;
        ctx.strokeStyle = `hsl(${counter}, 70%, 70%)`;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
      }
      prevX = left;
      prevY = bottom;
    }
  };

  return (
    <Wrapper>
      <Canvas
        ref={cRef}
        height={300}
        width={600}
        onMouseDown={() => {
          localMouseDown = true;
          socket.emit('mouseDown');
        }}
        onMouseUp={() => {
          localMouseDown = false;
          socket.emit('mouseUp');
        }}
        onMouseLeave={() => {
          localMouseDown = false;
          socket.emit('mouseUp');
        }}
        onMouseMove={handleMouseMove}
      />
      <Button onClick={() => socket.emit('clientDrawDelete')}>Clear</Button>
    </Wrapper>
  );
};
export default Draw;

const Wrapper = styled.div`
  padding: 3.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Canvas = styled.canvas`
  background: #ceedf7;
  border-radius: 5px;
`;
const Button = styled.button`
  background: #1f3535;
  border: none;
  border-radius: 100px;
  padding: 1.2rem;
  color: white;
  font-weight: bold;
  margin-top: 2.4rem;
`;
