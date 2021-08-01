import React, { useState, useEffect, FC } from 'react';

const Deck: FC = () => {

    const [cards, setCards] = useState({
        suits: ["♥", "♦", "♠", "♣"],
        values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    }); 

    const [gameDeck, setGameDeck] = useState([]);

    const makeGameDeck = () => {
        let deckArr = [];

        for(let i=0; i < cards.suits.length; i++) {
            for(let j=0; j < cards.values.length; j++) {
                deckArr.push(cards.values[j] + cards.suits[i]);
            }
        }
    }

    return (
        <div className="Deck">
            {
                cards.suits.map(suit => (
                    <div className="suit">
                        <h3>{suit}</h3>
                    </div>
                ))
                // gameDeck.map(card => (
                //     <div className="card">
                //         <h3>{card}</h3>
                //     </div>
                // ))
            }
        </div>
    );
}

export default Deck;
