import styled from 'styled-components'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'
import useChat from '../useChat'
import { useState, useEffect } from 'react'
const APP = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
  `
const LOCALSTORAGE_KEY = "save-me";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const {status, messages, sendMessage, clearMessages} = useChat()
  const [name, setName] = useState(savedMe || '')
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if (signedIn)
      localStorage.setItem(LOCALSTORAGE_KEY, name)
  }, [signedIn, name]);
  return (
    <APP>
      {signedIn?(
        <ChatRoom
          status={status}
          messages={messages}
          sendMessage={sendMessage}
          clearMessages={clearMessages}
        />):
        <SignIn
          name={name}
          setName={setName}
          setSignedIn={setSignedIn}
        />
      } 
    </APP>
  )
}

export default App