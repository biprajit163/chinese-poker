/*
Unicode cards: https://en.wikipedia.org/wiki/Playing_cards_in_Unicode 
*/

import React, { useState, useEffect, FC } from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import { Game } from './components/Game';
import { Home } from './components/Home';


const App: FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route exact path="/game" render={() => (
                    <Game/>
                )}/>
            </BrowserRouter>
        </div>
    );
}

export default App;