import { useState} from "react";
import bcrypt from "bcryptjs"
const client = new WebSocket('ws://localhost:4000')
const saltRounds = 10
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({type:'', msg:''});
  // show signedIn page,send username, password to backend, set true if receiving "Sign In success" 
  const [signedIn, setSignedIn] = useState(false);
  const sendData = async (data) => {
    await client.send(
            JSON.stringify(data));
  };
  const sendMessage = (payload) => {
    sendData(["input", payload]);
  };
  const clearMessages = () => {
    sendData(["clear"]);
  };
  const sendSignIn = async(username, password) => {
    const payload = {username:username, password:password}
    sendData(["sign in", payload])
  }
  const sendSignUp = async(username, password) => {
    const hash = await bcrypt.hash(password, saltRounds)
    const payload = {username:username, password:hash}
    sendData(["sign up", payload])
    // const res = await bcrypt.compare(hashedPassword, Hash)

  }

  client.onmessage = async(byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);    
    switch (task) {
      case "output": {
        setMessages(() =>  
        [...messages, ...payload]); break; }
      case "status": {
        setStatus(payload);
        break; }
      case "init": {
        setMessages(payload);
        break;}
      case "cleared": {
        setMessages([]);
        break;
      }
      case "sign in success":{
        setSignedIn(true)
        break
      }
      default: break;
    }
  }


  return {
    status,
    messages,
    sendMessage,
    clearMessages,
    signedIn,
    setSignedIn,
    sendSignIn,
    sendSignUp
 };
};

export default useChat;
