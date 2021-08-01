import React, { useState, useEffect, FC } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { io } from 'socket.io-client';
import { Deck } from './CardDeck';
import { Game } from './Game';


export const JoinGame: FC = () => {

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
    const gameDeck = Deck();

    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    })

    // useEffect(() => {
    //     socket.on('getPlayers', (players) => setGame(players));
    // }, [])

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
            <Game/>
        </div>
    );
}

