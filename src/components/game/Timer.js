import { useContext, useEffect } from "react";
import GameContext from "../../contexts/GameContext";

function Timer() {

    const { gameState, setGameState } = useContext(GameContext);

    useEffect(() => {
        if (gameState.shouldReset) {
            setGameState(prev => ({...prev, time: '0:00'}));
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
                setGameState(prev => ({...prev, time: newTime}));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [gameState.shouldReset, gameState.isStarted, gameState.time, setGameState]);

    return (
        <div className="button-no-action">{gameState.time}</div>
    );
}

export default Timer;