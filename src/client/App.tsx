import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';


function App() {
    const game_uri = 'http://localhost:5000';

    const socket = io(game_uri, {/* Options go here */});

    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
        });
    }, []);

    return (
        <div className="App">
            <h1>Welcome to Chinese Poker!</h1>
            <div>
                let's get this shit started!!!
            </div>
        </div>
    );
}

export default App;