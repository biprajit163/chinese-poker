import React, { useState, FC } from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';

interface PlayerInfo {
    userName?: string;
}

const JoinGame: FC = () => {

    const [player, setPlayer] = useState<PlayerInfo>({ userName: "" })

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log(player);
        setPlayer({ userName: "" });
    }

    const handleUsernameChange = (e: any) => {
        setPlayer({
            userName: e.target.value,
        });
    };

    return (
        <div className="JoinGame">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={player.userName}
                        onChange={handleUsernameChange}
                    />
                    <button type="submit" className="btn btn-primary">submit</button>
                </div>
            </form>
            {/* <BrowserRouter>
                <Route exact path="" render={}/>
            </BrowserRouter> */}
        </div>
    );
}

export default JoinGame;