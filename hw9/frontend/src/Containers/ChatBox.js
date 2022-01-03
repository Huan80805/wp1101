import Message from "../Components/Message"
import { useEffect, useRef } from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import {CHATBOX_QUERY, MESSAGE_SUBSCRIPTION} from "../graphql"

const Messages = styled.div`
    height: calc(240px-36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`
const ChatBox =({me, friend, ...props}) => {
    const messagesFooter = useRef(null)
    // take data first time
    const {data, loading, subscribeToMore} = useQuery(CHATBOX_QUERY,{
        variables:{
            name1:me,
            name2:friend,
        },
    })
    const scrollToBottom = ()=>{
        messagesFooter.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(() => {
        scrollToBottom()
        }, [data])
    useEffect(() => {
        try{
            // update message using subscription
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables:{name1:me, name2:friend},
                updateQuery:(prev, {subscriptionData}) =>{
                    if(!subscriptionData.data) return prev
                    const newMessage = subscriptionData.data.message.body
                    console.log(newMessage)
                    return {
                        chatBox:{
                            messages: [...prev.chatBox.messages, newMessage],
                        },
                    }
                }
            })
        }catch(e){console.log("subscription error")}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeToMore]);
    if (loading) return <p>loading</p>
    return(
        <Messages>
            {data.chatBox.messages.map(({sender: {name}, body}, i) => (
                <Message me={me} name={name} body={body} key={name+body+i}/>
            ))}
            <div ref={messagesFooter} />
        </Messages>
    )
}
export default ChatBox