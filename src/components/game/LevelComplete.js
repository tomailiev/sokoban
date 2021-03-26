import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import UserContext from "../../contexts/UserContext";
import { updateUser } from "../../services/user.service";

function LevelComplete(props) {

    const { gameState } = useContext(GameContext);
    const { user, setUser } = useContext(UserContext);


    const levelCompleteMessage = 'Level Complete!';
    const gameCompleteMessage = 'Congrats! You beat Sokoban.';

    function changeLevel(num) {
        if (user.bestLevel < num) {
            // setUser(prev => ({ ...prev, bestLevel: num }));
            //TODO UPDATE USER BEST LEVEL
            updateUser(user.id, { bestLevel: num })
                .then(() => setUser(prev => ({ ...prev, bestLevel: num })))
                .catch(console.error);
        } else {
            gameState.getLevel(num);
        }
    }

    return (
        <div>
            <h2>{gameState.isGameDone ? gameCompleteMessage : levelCompleteMessage}</h2>
            {!gameState.isGameDone
                ? (<div>
                    <button className="button-square" onClick={() => changeLevel(gameState.level.index - 1)} disabled={!(gameState.level.index - 1)}>Previous Level</button>
                    <button className="button-square" onClick={() => changeLevel(gameState.level.index + 1)}>Next Level</button>
                </div>)
                : ''}
        </div>
    )
}

export default LevelComplete;