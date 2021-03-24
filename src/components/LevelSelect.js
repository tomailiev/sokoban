import { useContext, useEffect, useState } from "react";
import GameContext from "../contexts/GameContext";
import getUser from "../services/user.service";

const LevelSelect = (props) => {

    const [levels, setLevels] = useState(0);
    const { gameState, setGameState } = useContext(GameContext);

    useEffect(() => {
        getUser()
            .then(u => {
                setLevels(u.bestLevel);
                props.handleLevelChange(u.bestLevel);
            })
            .catch(console.error);
    }, [])

    return (
        <select className="button-square" value={props.current || gameState.level?.index || 'Select level'} onChange={(e) => props.handleLevelChange(Number(e.target.value))}>
            <option value="Select level" disabled>Level...</option>
            {Array.from(Array(levels)).map((_x, i) => <option key={i + 1} value={i + 1}> Level {i + 1}</option>)}
        </select>
    );
};

export default LevelSelect;