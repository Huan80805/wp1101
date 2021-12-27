import styled from 'styled-components'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { useState, useEffect } from 'react'
import { message } from 'antd'
const APP = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
  `

const displayStatus = (payload) => {
  //message show up automatically at top
  if (payload.msg) {
    const { type, msg } = payload
    const content = {
      content: msg, duration: 0.5 }
    switch (type) {
      case 'success':
        message.success(content)
        break
      case 'error':
        message.error(content)
        break
      case 'info':
        message.success(content)
        break
      default:
        message.error(content)
        break
}}}
const LOCALSTORAGE_KEY = "save-me";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || '')
  const [signedIn, setSignedIn] = useState(false);
  // show signUp page
  // const [signedUp, setSignedUp] = useState(false)
  // useEffect(() => {
  //   // effect when status's state change
  //   displayStatus(status)},[status])
  useEffect(() => {
    if (signedIn)
      localStorage.setItem(LOCALSTORAGE_KEY, me)
  }, [signedIn, me]);
  return (
    <APP>
      {signedIn?(
        <ChatRoom
          me={me}
          displayStatus={displayStatus}
        />):
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
        />
      }
    </APP>
  )
}

export default App
export {displayStatus}