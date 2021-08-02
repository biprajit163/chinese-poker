/*
Unicode cards: https://en.wikipedia.org/wiki/Playing_cards_in_Unicode 
*/

import React, { useState, useEffect, FC } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import { Game } from './components/Game';
import { Deck } from './components/CardDeck';


const App: FC = () => {
    const gameDeck = Deck();
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" render={() => (
                    <Game/>
                )}/>
            </BrowserRouter>
        </div>
    );
}

export default App;