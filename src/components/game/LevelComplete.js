import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './LevelComplete.css';
import GameContext from "../../contexts/GameContext";
import UserContext from "../../contexts/UserContext";

function LevelComplete() {

    const { gameState } = useContext(GameContext);
    const { user, setUser } = useContext(UserContext);
    const [animating, setAnimating] = useState(false);

    const levelCompleteMessage = 'Level Complete!';
    const gameCompleteMessage = 'Congrats! You beat Sokoban.';

    useEffect(() => {
        setAnimating(true);
    }, []);

    function changeLevel(num) {
        if (user.id && user.bestLevel < num) {
            setUser(prev => ({ ...prev, bestLevel: num }));
        } else {
            gameState.getLevel(num);
        }
    }

    return (
        <div
            className={animating ? 'level-complete-wrapper animating' : 'level-complete-wrapper'}
            onAnimationEnd={() => setAnimating(false)}
        >
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