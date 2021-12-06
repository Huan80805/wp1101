import styled from 'styled-components'
import ChatRoom from './ChatRoom'
import useChat from '../useChat'
const APP = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
  `
const App = () => {
  const {status, messages, sendMessage, clearMessages} = useChat()
  return (
    <APP>
        <ChatRoom
            status={status}
            messages={messages}
            sendMessage={sendMessage}
            clearMessages={clearMessages}
        />
    </APP>
  )
}

export default App