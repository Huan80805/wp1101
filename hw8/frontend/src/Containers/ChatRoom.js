import Title from "../Components/Title"
import Message from "../Components/Message"
import { useState, useEffect, useRef } from 'react'
import { Input, message,Button, Tag } from 'antd'

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
      default:
        message.error(content)
        break
}}}

const ChatRoom = ({status, messages, clearMessages, sendMessage})=> {
    const [username, setUsername] = useState('')
    const [body, setBody] = useState('')  // textBody
    const bodyRef = useRef(null)
    useEffect(() => {
        // effect when status's state change
        displayStatus(status)},[status])
    return(
        <>
            <Title>
                <h1>Simple Chat</h1>
                <Button type="primary" danger onClick={clearMessages}>
                  Clear
                </Button>
            </Title>
            <Message>
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}> No messages... </p>
                ) : (
                messages.map(({ name, body }, i) => (
                    <p className="App-message" key={i}>
                    <Tag color="blue">{name}</Tag> {body}
                    </p>
                ))
                )}    
            </Message>
            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    bodyRef.current.focus()
                }}}
                style={{ marginBottom: 10 }}
            ></Input>
            <Input.Search
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    // check error: empty msg or enpty username
                    if (!msg || !username) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                        return
                    }    
                    sendMessage({ name: username, body: msg })
                    setBody('')
                }}
            ></Input.Search>
        </>
    )
}
export default ChatRoom