const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;


const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({ server });

function updateNumberOfUSers(connection) {
  const numberOfUsers = {
    type: "info",
    numberOfUsers: wss.clients.size
  }

  connection.forEach(function each(client) {
    client.send(JSON.stringify(numberOfUsers));
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(`Number of clients connected: ${wss.clients.size}`);

  updateNumberOfUSers(wss.clients);


  ws.on('message', function incoming(data) {
    let incomingMessage = JSON.parse(data);

    if (incomingMessage.type === 'postMessage') {
      incomingMessage.type = 'incomingMessage';

    } else if (incomingMessage.type === 'postNotification') {
      incomingMessage.type = 'incomingNotification';
    }

    incomingMessage["id"] = uuidv1();
    wss.clients.forEach(function each(client) {

      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(incomingMessage));
      }
    }
    );
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    updateNumberOfUSers(wss.clients)
  })
});