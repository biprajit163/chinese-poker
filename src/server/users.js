const players = [];

const addPlayer = ({ id, userName, hand }) => {
    const maxPlayers = players.length;

    if(maxPlayers === 4) {
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

module.exports = {
    addPlayer,
    getPlayer,
    removePlayer,
    getActivePlayers
};
