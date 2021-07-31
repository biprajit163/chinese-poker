const players = [];

const addPlayer = ({id, userName}) => {
    const maxPlayers = players.length;

    if(maxPlayers === 4) {
        return({error: "Game full"});
    } else {
        const newPlayer = {id, userName, hand};
        players.push(newPlayer);
        return({newPlayer});
    }
}

const getPlayer = ({id}) => {
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
    getActivePlayers
};
