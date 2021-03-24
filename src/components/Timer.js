import { useContext, useEffect, useState } from "react";
import GameContext from "../contexts/GameContext";

function Timer() {

    const [time, setTime] = useState('0:00');
    const { gameState } = useContext(GameContext);

    useEffect(() => {
        if (gameState.shouldReset) {
            setTime('0:00');
        }
        let interval;
        if (gameState.isStarted) {
            interval = setInterval(() => {
                let [mins, secs] = time.split(':').map(Number);
                if (secs === 59) {
                    secs = 0;
                    mins++;
                } else {
                    secs++;
                }
                const newTime = `${mins}:${secs < 10 ? `0${secs}` : secs}`;
                setTime(newTime);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [gameState.shouldReset, gameState.isStarted, time]);


    return (
        <div className="button-square">{time}</div>
    );
}

export default Timer;