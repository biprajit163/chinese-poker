import React from 'react';

export const Deck = () => {
    let suits = ["♥", "♦", "♠", "♣"];
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let deckArr = [];

    for(let i=0; i < suits.length; i++) {
        for(let j=0; j < values.length; j++) {
            deckArr.push(values[j] + suits[i]);
        }
    }

    return deckArr;
}

