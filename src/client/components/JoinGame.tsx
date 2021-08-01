import React, { useState, useEffect, FC } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { io } from 'socket.io-client';


const JoinGame: FC = () => {

    interface PlayerInfo {
        id?: number | undefined;
        userName?: string;
        hand?: string[];
    }

    const initialPlayerState: any | undefined = {
        id: 0,
        userName: "",
        hand: [],
    }

    const [player, setPlayer] = useState<PlayerInfo>(initialPlayerState);
    const [game, setGame] = useState([]);

    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    })

    useEffect(() => {
        socket.on('getPlayers', (players) => setGame(players));
    }, [])


    const handleSubmit = (e: any) => {
        e.preventDefault();

        socket.emit('registerPlayer', player);
        socket.on('playersUpdated', (players) => setGame(players));

        setPlayer(initialPlayerState);
    }

    const handleUsernameChange = (e: any) => {
        setPlayer({
            ...player,
            userName: e.target.value,
        });
    };


    const kickPlayer = (playerObj: any) => {
        socket.emit('kickPlayer', playerObj.player);
        socket.on('getPlayers', (players) => setGame(players));
    }

    return (
        <div className="JoinGame">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={player.userName}
                        onChange={handleUsernameChange}
                    />
                    <button type="submit" className="btn btn-primary">submit</button>
                </div>
            </form>

            <div className="players">
                {
                    game.map((e, i) => (
                        <div>
                            <p>{e.userName} : {e.id} : {e.hand}</p>
                            <button onClick={() => kickPlayer({player: e})}>Exit game</button>
                        </div>
                    ))
                }
            </div>
            {/* <BrowserRouter>
                <Route exact path="" render={}/>
            </BrowserRouter> */}
        </div>
    );
}

export default JoinGame;