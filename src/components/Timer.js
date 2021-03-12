import { useEffect, useState } from "react";

function Timer(props) {

    const [time, setTime] = useState('0:00');

    useEffect(() => {
        if (props.shouldReset) {
            setTime('0:00');
        }
        let interval;
        if (props.hasStarted) {
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
    }, [props.shouldReset, props.hasStarted, time]);


    return (
        <div>{time}</div>
    )
}

export default Timer;