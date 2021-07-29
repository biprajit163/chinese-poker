"use strict";

const express = require('express');
const io = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express()
const server = http.createServer(app);


app.get('/', (req, res) => {
    res.send('<h1>Hello Player One!!</h1>');
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});