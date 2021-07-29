import React from 'react';
import './App.css';
import { io } from 'socket.io-client';


function App() {
    const game_uri = 'server/api'
    
    const socket = io(game_uri, {
        reconnectionDelayMax: 10000,
        auth: {
            token: "auth token goes here"
        },
        query: {
            "my-key": "my-value"
        }
    });


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