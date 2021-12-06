import Message from "./model/message.js";
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
  
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = (ws) => {
  //filter: created_at:-1 reversed time stamp
  Message.find().sort({ created_at: -1 }).limit(100)
    .exec((err, res) => {
      if (err) throw err
      // initialize app with existing messages
      sendData(['init', res],ws)
})}
export { sendData, sendStatus, initData }

  