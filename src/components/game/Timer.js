import { useContext, useEffect } from "react";
import GameContext from "../../contexts/GameContext";

function Timer() {

    const { gameState, dispatch } = useContext(GameContext);

    useEffect(() => {
        if (gameState.shouldReset) {
            dispatch({ type: 'setTimer', payload: '0:00' });
        }
        let interval;
        if (gameState.isStarted) {
            interval = setInterval(() => {
                let [mins, secs] = gameState.time.split(':').map(Number);
                if (secs === 59) {
                    secs = 0;
                    mins++;
                } else {
                    secs++;
                }
                const newTime = `${mins}:${secs < 10 ? `0${secs}` : secs}`;
                dispatch({ type: 'setTimer', payload: newTime });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [gameState.shouldReset, gameState.isStarted, gameState.time, dispatch]);

    return (
        <div className="button-no-action">{gameState.time}</div>
    );
}

export default Timer;