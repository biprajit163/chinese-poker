"use strict";


/* --------------------------------------------------------------------------------------- 
- use express and socket.io
- setup http server and socket.io connection
- setup socket.io-client so server and client can communicate
- userroom concept on socket.io docs on user.js
    - create remote rooms from users on client side
    - send a "room code" from client side and use it to create a room on the server side 
    - use random query generator and query params for this.

** Important Links:
- Getting started with TS and Socket.io
    - https://tutorialedge.net/typescript/typescript-socket-io-tutorial/ 
- Socket.io Client API
    - https://socket.io/docs/v3/client-api/index.html#Socket 
- Socket.io Server API
    - https://socket.io/docs/v3/server-api/index.html 

---------------------------------------------------------------------------------------- */

const { addPlayer, getPlayer, getActivePlayers } = require('./users');

const express = require('express')
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
    }
});


app.get('/', (req, res) => {
    res.send('<h1>Chinese Poker server</h1>');
});



io.on('connection', (socket) => {
    console.log("A user connected");
    
    socket.on('registerPlayer', ({ id, userName, hand }) => {
        const {newPlayer} = addPlayer({
            id: id,
            userName: userName,
            hand: hand
        });

        // socket.broadcast.emit('playersUpdated', getActivePlayers());
        socket.emit('playersUpdated', getActivePlayers());
    });
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

