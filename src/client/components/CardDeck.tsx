import React, { useState, useEffect, FC } from 'react';

export const Deck = () => {

    const [cards, setCards] = useState({
        suits: ["♥", "♦", "♠", "♣"],
        values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    }); 

    const [gameDeck, setGameDeck] = useState([]);

    useEffect(() => {
        makeGameDeck();
        console.log(gameDeck);
    }, [])

    const makeGameDeck = () => {
        let deckArr: any = [];

        for(let i=0; i < cards.suits.length; i++) {
            for(let j=0; j < cards.values.length; j++) {
                deckArr.push(cards.values[j] + cards.suits[i]);
            }
        }

        setGameDeck(deckArr);
    }

    return gameDeck;
}

