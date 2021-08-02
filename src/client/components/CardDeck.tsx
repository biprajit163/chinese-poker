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


export const Rules = (p1Card: any, p2Card: any) => {
    let whoWon = "";
    let suits = ["♦", "♣", "♥", "♠"];
    let p1Suit = p1Card.split("")[1];
    let p2Suit = p2Card.split("")[1];
    
    
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let p1Val = p1Card.split("")[0];
    let p2Val = p1Card.split("")[0];


    if(
        Number.isNaN(parseInt(p1Val)) === true &&
        Number.isNaN(parseInt(p2Val)) === true 
    ) {
        if(
            (p1Val === p2Val) && (p1Suit === p2Suit)
        ) {
            whoWon = "";
        } else if(
            p1Val === p2Val
        ) {
            if(
                suits.indexOf(p1Suit) > suits.indexOf(p2Suit)
            ) {
                whoWon = "p1";
            } else if(
                suits.indexOf(p2Suit) > suits.indexOf(p1Suit)
            ) {
                whoWon = "p2";
            }
        } else if(
            values.indexOf(p1Val) > values.indexOf(p2Val) 
        ) {
            whoWon = "p1";
        } else if(
            values.indexOf(p2Val) > values.indexOf(p1Val)
        ) {
            whoWon = "p2";
        }
    } else if(
        Number.isNaN(parseInt(p1Val)) === false &&
        Number.isNaN(parseInt(p2Val)) === false
    ) {
        if(
            (parseInt(p1Val, 10) === parseInt(p2Val, 10)) &&
            p1Suit === p2Suit
        ) {
            whoWon = "";
        } else if(
            parseInt(p1Val, 10) === parseInt(p2Val, 10)
        ) {
            if(
                suits.indexOf(p1Suit) > suits.indexOf(p2Suit)
            ) {
                whoWon = "p1";
            } else if(
                suits.indexOf(p2Suit) > suits.indexOf(p1Suit)
            ) {
                whoWon = "p2";
            }
        } else if(
            parseInt(p1Val, 10) > parseInt(p2Val, 10) 
        ) {
            whoWon = "p1";
        } else if(
            parseInt(p2Val, 10) > parseInt(p1Val, 10)
        ) {
            whoWon = "p2";
        }
    } else if(
        Number.isNaN(parseInt(p1Val)) === true &&
        Number.isNaN(parseInt(p2Val)) === false 
    ) {
        whoWon = "p1";
    } else if(
        Number.isNaN(parseInt(p1Val)) === false &&
        Number.isNaN(parseInt(p2Val)) === true 
    ) {
        whoWon = "p2";
    } 

    return whoWon;
}
