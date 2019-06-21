import * as React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components/macro';
import './reset.css';
import './App.css';

const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [socket] = React.useState(() => {
    const innerSocket = socketIOClient('http://localhost:7777');
    innerSocket.on('serverMessage', data => {
      setMessages(data);
    });
    return innerSocket;
  });

  return (
    <Wrapper>
      <Input
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
      />
      <Button onClick={() => socket.emit('clientMessage', inputValue)}>
        send message
      </Button>
      <Go>
        {messages.map((message, i) => (
          <p key={message + i}>
            {message} <X onClick={() => socket.emit('clientDelete', i)}>X</X>
          </p>
        ))}
      </Go>
    </Wrapper>
  );
};
export default Chat;

const Wrapper = styled.div`
  padding: 3.2rem;
`;
const Go = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background: goldenrod;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  margin-right: 0.8rem;
  color: white;
  font-weight: bold;
`;

const Button = styled.button`
  background: #1f3535;
  border: none;
  border-radius: 100px;
  padding: 1.2rem;
  color: white;
  font-weight: bold;
`;

const X = styled.span`
  font-weight: bold;
  color: red;
  cursor: pointer;
`;
