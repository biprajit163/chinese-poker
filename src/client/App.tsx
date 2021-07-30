import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

/*
Unicode cards: https://en.wikipedia.org/wiki/Playing_cards_in_Unicode 
*/

function App() {
    const [msg, setMsg] = useState("sub");
    
    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    });

    useEffect(() => {
        socket.on('serverToClient', (data) => {
            setMsg(data);
        });

        socket.on('playersUpdated', (players) => {
            console.log("updated players: ", players);
        });
    }, []);

    const handleClick = () => {
        const player = {
            userName: 'Player1'
        };
        socket.emit('registerPlayer', player);
    }

    return (
        <div className="App">
            <h1>{msg}</h1>
            <button onClick={() => handleClick()}>Add user</button>
        </div>
    );
}

export default App;