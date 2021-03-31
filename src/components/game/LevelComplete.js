import { useContext } from "react";
import { Link } from "react-router-dom";
import GameContext from "../../contexts/GameContext";
import UserContext from "../../contexts/UserContext";
import { updateUser } from "../../services/user.service";

function LevelComplete(props) {

    const { gameState } = useContext(GameContext);
    const { user, setUser } = useContext(UserContext);


    const levelCompleteMessage = 'Level Complete!';
    const gameCompleteMessage = 'Congrats! You beat Sokoban.';

    function changeLevel(num) {
        if (user.id && user.bestLevel < num) {
            setUser(prev => ({ ...prev, bestLevel: num }));
        } else {
            gameState.getLevel(num);
        }
    }

    return (
        <div>
            <h2>{gameState.isGameDone ? gameCompleteMessage : levelCompleteMessage}</h2>
            {!user.id
                ? (<div>
                    <p>Login or Register to play the rest of the levels, save your progress and more!</p>
                    <Link className="button-square" to="/login">Login</Link>
                    <Link className="button-square" to="/register">Register</Link>
                </div>)
                : !gameState.isGameDone
                    ? (<div>
                        <button className="button-square" onClick={() => changeLevel(gameState.level.index - 1)} disabled={!(gameState.level.index - 1)}>Previous Level</button>
                        <button className="button-square" onClick={() => changeLevel(gameState.level.index + 1)}>Next Level</button>
                    </div>)
                    : null
            }
        </div>
    )
}

export default LevelComplete;