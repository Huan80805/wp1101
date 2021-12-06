import {WebSocketServer} from 'ws';
import mongodb from './mongo.js';
import http from 'http';
import express from 'express';
import Message from './model/message.js'
import { sendData, sendStatus, initData } from './wssConnect.js';
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const db = mongodb()
const PORT = process.env.port || 4000
const broadcastMessage = (data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

db.once('open', () => {
    wss.on('connection', (ws) => {
        //initialize
        initData(ws)
        ws.onmessage = async (byteString) => {
          const { data } = byteString
          const [task, payload] = JSON.parse(data)
          switch (task) {
            case 'input': {
              const { name, body } = payload
              const message
                = new Message({ name, body })
              try { await message.save(); //save to DB
              } catch (e) { throw new Error
                ("Message DB save error: " + e);
              }
              // send to client
              // sendData(['output', [payload]], ws)
              // sendStatus({
              //   type: 'success',
              //   msg: 'Message sent.'
              // }, ws)
              broadcastMessage(
                ['output', [payload]],{
                type: 'success',
                msg: 'Message sent.'
              })
              break      
            }
            case 'clear': {
              Message.deleteMany({}, () => {
                // sendData(['cleared'], ws)
                // sendStatus({ type: 'info', msg: 'Message cache cleared.'},ws)
              })
              broadcastMessage(
                ['cleared'],{
                type: 'info',
                msg: 'Message cache cleared.'
              })
              break
            }
        
            
          default: break
          }
        }
    })
      
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
  })


  
  


