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

    useEffect(() => {
        
        if(
            p1.card !== "" &&
            p2.card !== ""
        ) {
            let whoWon = Rules(p1.card, p2.card);

            if(whoWon === "p1") {
                setPoints(prevState => {
                    return({
                        ...prevState,
                        playerOne: prevState.playerOne + 1
                    });
                });


                for(let i=0; i < players.length; i++) {
                    if(players[i].id === p1.id) {
                        socket.emit('removeCard', { 
                            playerHand: players[i].hand,
                            cardPicked: p1.card  
                        });
                        socket.on('removeCardHand', data => {
                            players[0].hand = data.newHand;
                            console.log(players[0].hand);
                        });
                    };
                };

                setTimeout(() => {
                    setP1({ id: "", card: ""});
                    setP2({ id: "", card: ""});
                }, 500);

            } else if(whoWon === "p2") {
                setPoints(prevState => {
                    return({
                        ...prevState,
                        playerTwo: prevState.playerTwo + 1
                    });
                });


                for(let i=0; i < players.length; i++) {
                    if(players[i].id === p2.id) {
                        socket.emit('removeCard', { 
                            playerHand: players[i].hand,
                            cardPicked: p2.card  
                        });
                    };
                };

                setTimeout(() => {
                    setP1({ id: "", card: ""});
                    setP2({ id: "", card: ""});
                }, 500);

            } else if(whoWon === "") {
                setTimeout(() => {
                    setP1({ id: "", card: ""});
                    setP2({ id: "", card: ""});
                }, 500);   
            }
        };
    }, [p1.card, p2.card]);


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

