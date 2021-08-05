import React, { FC } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import myLogo from '../../../public/images/myLogo.png';


export const Home: FC = () => {
    return (
        <div className="Home">
            <div className="title-container">
                <h1>Poker Roulette</h1>
                <p>Get the most points in a minute</p>
            </div>
            <Link to="/game">
                <button className="btn btn-primary">Play Game</button>
            </Link>

            <div className="rules-section">
                <div>
                    This is a single player game with no AI, where you can sign up two different players and controll each of their actions to get points and eventually decide a winner. Click the <em>Play Game</em> button to be taken to the game, enter two username, the clock will start and it is set to a default of 60 seconds. then click <em>shuffle deck</em> to shuffle the deck and give each player a hand, and start playing the game. You can click on a card and all the players cards will reveal for one second, whichever player picks the higher card wins that round and will gain a point and the winner will lose the higher card. Whoever has the most points by the end of 60 seconds wins the game. You can also click <em>End Game</em> to start over.
                    <div>
                        <span>Warning: <em style={{ fontWeight: 'normal'}}>the game has a lot of bugs in it and sometimes the higher card may not win</em></span>
                    </div>
                </div>
            </div>

            <div className="profile-info">
                <a 
                    href="https://www.linkedin.com/in/biprajit-majumder/"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    target="_blank"
                >
                    <AiFillLinkedin 
                        style={{
                            height: '3em',
                            width: '3em',
                        }}
                    />
                </a>
                
                <a 
                    href="https://github.com/biprajit163"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                    target="_blank"
                >
                    <AiOutlineGithub 
                        style={{
                            height: '3em',
                            width: '3em',
                        }}
                    />
                </a>

                <a 
                    href="https://biprajit163.wixsite.com/website"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                    target="_blank"
                >
                    <img
                        src={myLogo} 
                        alt="My Logo" 
                        style={{
                            height: '3em',
                            width: '3em',
                        }}
                    />
                </a>
            </div>
        </div>
    );
}
