import { useContext } from "react";
import GameContext from "../contexts/GameContext";

function LevelComplete(props) {

    const { gameState } = useContext(GameContext);

    const levelCompleteMessage = 'Level Complete!';
    const gameCompleteMessage = 'Congrats! You beat Sokoban.';

    function changeLevel(num) {
        gameState.getLevel(num);
    }

    return (
        <div>
            <h2>{gameState.isGameDone ? gameCompleteMessage : levelCompleteMessage}</h2>
            {!gameState.isGameDone
                ? (<div>
                    <button onClick={() => changeLevel(gameState.level.index - 1)} disabled={!(gameState.level.index - 1)}>Previous Level</button>
                    <button onClick={() => changeLevel(gameState.level.index + 1)}>Next Level</button>
                </div>)
                : ''}
        </div>
    )
}

export default LevelComplete;