const players = [];

const addPlayer = ({ id, userName, hand }) => {
    const maxPlayers = players.length;

    if(maxPlayers === 2) {
        return({error: "Game full"});
    } else {
        const newPlayer = {id, userName, hand};
        players.push(newPlayer);
        return({ newPlayer });
    }
}

const removePlayer = (id) => {
    let playerIdx = players.findIndex(player => player.id === id);
    
    if(playerIdx !== -1) {
        return players.splice(playerIdx, 1);
    }
}

const getPlayer = ({ id }) => {
    return(
        players.find(player => player.id === id)
    );
}

const getActivePlayers = () => {
    return players;
}

const setHands = (deck) => {
    for(let i=0; i < players.length; i++) {
        players[i].hand = [];
    }

    let i=0; 
    while(i < deck.length) {
        for(let j=0; j < players.length; j++) {
            players[j].hand.push(deck[i]);
            i++;
        }
    }
    // for(let i=0; i < deck.length; i++) {
    //     for(let j=0; j < players.length; j++) {
    //         players[j].hand.push(deck[i]);
    //     }
    // }

    return players;
}

module.exports = {
    addPlayer,
    getPlayer,
    removePlayer,
    getActivePlayers,
    setHands
};
