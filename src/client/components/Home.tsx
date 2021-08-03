import React, { FC } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export const Home: FC = () => {
    return (
        <div>
            <h1>Welcome to the home page</h1>
            <Link to="/game">
                <button className="btn btn-primary">Play Game</button>
            </Link>
        </div>
    );
}
