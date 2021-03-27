import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import UserContext from "../../contexts/UserContext";

const LevelSelect = () => {

    const { gameState } = useContext(GameContext);
    const { user } = useContext(UserContext);

    function changeLevel(num) {
        gameState.getLevel(num);
    }

    return (
        <select className="button-square" value={gameState.level?.index || 'Select level'} onChange={(e) => changeLevel(Number(e.target.value))}>
            <option value="Select level" disabled>Level...</option>
            {Array.from(Array(user?.bestLevel)).map((_x, i) => <option key={i + 1} value={i + 1}> Level {i + 1}</option>)}
        </select>
    );
};

export default LevelSelect;