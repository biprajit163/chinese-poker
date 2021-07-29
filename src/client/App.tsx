import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';


/*
 Unicode cards: https://en.wikipedia.org/wiki/Playing_cards_in_Unicode 
*/

function App() {
    const [state, setState] = useState({message: ""});
    const [msg, setMsg] = useState("sub");
    
    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    });

    socket.on("connect", () => {
        console.log(socket.connected);
    });

    socket.on("bipBar", (x) => {
        console.log("Click from bipFoo", x);
    });

    useEffect(() => {
        socket.on('serverToClient', (data) => {
            setMsg(data);
        });
    }, []);

    const handleClick = () => {
        socket.emit("bipFoo")
        socket.emit('registerPlayer', {name: "Biprajit"})
    }

    return (
        <div className="App">
            <h1>{msg}</h1>
            <button onClick={() => handleClick()}>get Message</button>
        </div>
    );
}

export default App;