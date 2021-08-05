"use strict";


const { 
    addPlayer, 
    getPlayer, 
    getActivePlayers, 
    removePlayer,
    removeAllPlayers,
    setHands,
} = require('./users');

const express = require('express')
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
require("dotenv").config();


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
    res.send(`
        <div>
            <h1>Poker Roulette</h1>
            <p>Welcome to the poker roulette server</p>
        </div>
    `);
});



io.on('connection', (socket) => {
    // console.log("A user connected");
    
    socket.emit('getPlayers', getActivePlayers());

    socket.on('registerPlayer', ({ id, userName, hand }) => {
        const newPlayer = addPlayer({
            id: socket.id,
            userName: userName,
            hand: hand
        });
        let activePlayers = getActivePlayers();
        
        socket.emit('playersUpdated', activePlayers);
    });
    
    socket.on('kickPlayers', (data) => {
        socket.emit('getPlayers', removeAllPlayers(data));
    });

    socket.on('shuffleDeck', ({ deck }) => {
        let shuffledDeck = deck.sort(() => 0.5 - Math.random());
        socket.emit('shuffleDeck', setHands(shuffledDeck));
    });


    socket.on('removeCard', ({ playerHand, cardPicked }) => {
        for(let i=0; i < playerHand.length; i++) {
            if(playerHand[i] === cardPicked) {
                playerHand.splice(i, 1)
            }
        }

        console.log(playerHand);

        socket.emit('removeCardHand', { newHand: playerHand });
    })

});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

