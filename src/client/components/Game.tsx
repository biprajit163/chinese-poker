import React, { useState, useEffect, FC } from 'react';
import { io } from 'socket.io-client';
import { Deck, Rules } from './CardDeck';



export const Game: FC = () => {

    const game_uri = 'http://localhost:5000';
    const socket = io(game_uri, {
        reconnectionDelay: 10000,
    })

    interface PlayerInfo {
        id?: string,
        userName?: string;
        hand?: string[];
    }

    const initialPlayerState: any | undefined = {
        id: "",
        userName: "",
        hand: [],
    }

    const [player, setPlayer] = useState<PlayerInfo>(initialPlayerState);
    const [players, setPlayers] = useState([]);
    const [p1, setP1] = useState({ id: "", card: "" });
    const [p2, setP2] = useState({ id: "", card: "" });
    const [points, setPoints] = useState({
        playerOne: 0,
        playerTwo: 0,
    })
    const gameDeck = Deck();
    

    useEffect(() => {
        socket.on('getPlayers', (data) => setPlayers(data));
    }, []);

    useEffect(() => checkWinner(), [p1.card, p2.card]);


    const handleSubmit = (e: any) => {
        e.preventDefault();

        socket.emit('registerPlayer', player);
        socket.on('playersUpdated', (data) => setPlayers(data));

        setPlayer(initialPlayerState);
    }

    const handleUsernameChange = (e: any) => {
        setPlayer({
            ...player,
            userName: e.target.value,
        });
    };

    // const kickPlayer = (playerObj: any) => {
    //     socket.emit('kickPlayer', playerObj.player);
    // }

    const handleShuffle = () => {
        let shuffled = gameDeck.sort(() => Math.random() - 0.5);
        socket.emit('shuffleDeck', {deck: shuffled});
        socket.on('shuffleDeck', (data) => setPlayers(data));
    }

    const checkCardVal = (e: any, cardObj) => {
        let cardVal = e.target.innerHTML;

        if(cardObj.id === players[0].id) {
            setP1({
                id: cardObj.id,
                card: cardVal
            })
        } else if(cardObj.id === players[1].id) {
            setP2({
                id: cardObj.id,
                card: cardVal
            })
        }
    }

    const checkWinner = () => {
        let p1Card = p1.card;
        let p2Card = p2.card;

        let whoWon = Rules(p1Card, p2Card);
        console.log(whoWon);
    }

    return (
        <div className="JoinGame">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label><h2>Join Game</h2></label>
                </div>
                <div className="mb-3">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={player.userName}
                        onChange={handleUsernameChange}
                    />
                    <button type="submit" className="btn btn-primary">submit</button>
                </div>
            </form>

            <div className="game-board">
                <button 
                    onClick={() => handleShuffle()}
                    className="btn btn-success"
                >Shuffle Deck</button>
                {
                    players.map(player => {
                        return (
                          <div className={`${player.userName}`}>
                            <p>Username: {player.userName}</p>
                            <div className={`${player.userName}-hand container`}>
                              hand:
                              <div className="row">
                                {player.hand.map((card) => {
                                  return (
                                    <div
                                      className="card col"
                                      onClick={(e) => {
                                        checkCardVal(e, { id: player.id })
                                      }}
                                    >
                                      {card}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ); 
                    })
                }
            </div>
        </div>
    );
}

