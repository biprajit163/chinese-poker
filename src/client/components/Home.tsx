import React, { FC } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';

export const Home: FC = () => {
    return (
        <div>
            <div className="title-container">
                <h1>Poker Roulette</h1>
                <p>Get the most points in a minute</p>
            </div>
            <Link to="/game">
                <button className="btn btn-primary">Play Game</button>
            </Link>

            <div className="rules-section">
                This is a single player game with no AI, you can sign up two players
                but you can control each players actions.
            </div>

            <div className="profile-info">
                <a 
                    href="https://www.linkedin.com/in/biprajit-majumder/"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
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
            </div>
        </div>
    );
}
