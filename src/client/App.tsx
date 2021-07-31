/*
Unicode cards: https://en.wikipedia.org/wiki/Playing_cards_in_Unicode 
*/

import React, { useState, useEffect, FC } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import JoinGame from './components/JoinGame';


const App: FC = () => {
    const [msg, setMsg] = useState("Dummy Message");
    
    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    });

    useEffect(() => {
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
            <BrowserRouter>
                <Route path="/" exact render={() => (
                    <JoinGame/>
                )}/>
            </BrowserRouter>
        </div>
    );
}

export default App;