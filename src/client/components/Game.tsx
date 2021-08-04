import React, { useState, useEffect, FC } from 'react';
import { io } from 'socket.io-client';
import { Deck, Rules } from './CardDeck';



export const Game: FC = () => {

    // const game_uri = 'http://localhost:5000';
    const game_uri = 'https://poker-roulette-server.herokuapp.com/'; 

    const socket = io(game_uri, {
      reconnectionDelay: 10000,
    })

    interface PlayerInfo {
        id?: string,
        userName?: string;
        hand?: string[];
    }

    const initialPlayerState: any | never = {
        id: "",
        userName: "",
        hand: [],
    }

    const gameDeck = Deck();

    const [player, setPlayer] = useState<PlayerInfo>(initialPlayerState);
    const [players, setPlayers] = useState<any>([]);
    const [p1, setP1] = useState({ id: "", card: "" });
    const [p2, setP2] = useState({ id: "", card: "" });
    const [points, setPoints] = useState({
        playerOne: 0,
        playerTwo: 0,
    });

    const [timer, setTimer] = useState(60);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        socket.on('getPlayers', (data) => setPlayers(data));
    }, []);


    useEffect(() => {

        if(players.length === 2 && timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else if(timer === 0) {
            if(points.playerOne > points.playerTwo) {
                alert(players[0].userName + " won");
            } else if(points.playerOne < points.playerTwo) {
                alert(players[1].userName + " won");
            } else if(points.playerOne === points.playerTwo) {
                alert("It was a tie!");
            }
        }

    }, [timer, players]);
    

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
                        socket.on('removeCardHand', data => {
                            players[1].hand = data.newHand;
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


    const handleShuffle = () => {
        let shuffled = gameDeck.sort(() => Math.random() - 0.5);
        socket.emit('shuffleDeck', {deck: shuffled});
        socket.on('shuffleDeck', (data) => setPlayers(data));
    }

    const checkCardVal = (e: any, cardObj: any) => {
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

    const kickPlayers = () => {

      socket.emit('kickPlayers', players);
      socket.on('getPlayers', (data) => setPlayers(data));

      setTimer(60);
      setPoints({
        playerOne: 0,
        playerTwo: 0
      })
    }

    return (
      <div className="Game">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              <h2>Join Game</h2>
            </label>
          </div>
          <div className="mb-3">
            <label>Username:</label>
            <input
              type="text"
              value={player.userName}
              onChange={handleUsernameChange}
            />
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </div>
        </form>

        <div className="game-timer">{timer}</div>
        
        <button onClick={() => handleShuffle()} className="btn btn-success">
          Shuffle Deck
        </button>

        <button onClick={() => kickPlayers()} className="btn btn-danger">
            End Game
        </button>

        <div className="game-board">

          {players.map((player: any) => {
            return (
              <div
                className={`${player.userName}`}
                style={{
                  margin: "25px, 25px",
                }}
              >
                <p>Username: {player.userName}</p>
                <p className="points">
                  <span style={
                    player.userName === players[0].userName ? 
                    {
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: 'blue'
                    } :
                    player.userName === players[1].userName ?
                    {
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: 'red'
                    } : 
                    {
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: 'black'
                    }
                  }>{player.userName === players[0].userName ? 
                  points.playerOne : player.userName === players[1].userName ?
                  points.playerTwo : 0}</span>
                </p>

                <div className={`${player.userName}-hand container`}>
                  <div className="row"> hand:
                    {player.hand.map((card: any) => {
                      return (
                        <div
                          className={`card col`}
                          onClick={(e) => {
                            checkCardVal(e, { id: player.id });
                            setDisplay(true);
                            setTimeout(() => setDisplay(false), 1000);
                          }}
                          style={
                            player.userName === players[0].userName &&
                            display === true
                              ? {
                                  color: "blue",
                                }
                              : player.userName === players[1].userName &&
                                display === true
                              ? {
                                  color: "red",
                                }
                              : {
                                  color: "white",
                                }
                          }
                        >
                          {card}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

