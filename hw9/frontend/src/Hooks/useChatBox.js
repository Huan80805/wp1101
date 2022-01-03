import { useState } from "react"
const useChatBox =() => {
    //chatBoxes is an array of strings as friends
    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = (friend) => {
        if (chatBoxes.some((name) => name === friend)) {
            throw new Error(friend + "'s chat box has already opened.")
        }        
        setChatBoxes([...chatBoxes, friend])
        return friend
    }
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.indexOf(activeKey)
        const newChatBoxes = chatBoxes.filter((name) => name !== targetKey )
        setChatBoxes(newChatBoxes)
        return activeKey
            ? activeKey === targetKey // deleting current tab
                ? index===0 //deleting first tab
                    ? ''
                    : chatBoxes[index-1] //switch to previous tab
                :activeKey // not switching
            :'' //?
    }
    return{createChatBox, removeChatBox, chatBoxes}
}

export default useChatBox