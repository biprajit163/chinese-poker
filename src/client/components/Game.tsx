import React, { useState, useEffect, FC } from 'react';
import { io } from 'socket.io-client';


interface GameProps {
    players: any[],
    deck: []
}

export const Game: FC<GameProps> = ({players, deck}) => {

    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    });

    const [game, setGame] = useState({
        playersArr: players,
        deckArr: deck
    });

    useEffect(() => {
        socket.on('getPlayers', (data) => {
            setGame(prevState => {
                return {
                    ...prevState,
                    playersArr: data
                };
            })
        });
    }, []);

    const kickPlayer = (playerObj: any) => {
        socket.emit('kickPlayer', playerObj.player);
    }

    // const splitDeck = () => {
    //     for()
    // };

    return (
        <div>
            <h3>Poker Game</h3>
            {
                game?.playersArr?.map(player => {
                    return(
                        <div className={`${player.userName}`}>
                            <p>id: {player.id}</p>
                            <p>User Name: {player.userName}</p>
                            <p>hand: {player.hand.join(" ")}</p>
                            <button onClick={() => kickPlayer({player: player})}>Exit game</button>
                        </div>
                    );
                })
            }
        </div>
    );
}
