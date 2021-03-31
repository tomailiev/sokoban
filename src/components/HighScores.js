import { useEffect, useState } from "react";
import { getHighScores } from "../services/highScores.service";
import ScoreCard from "./shared/ScoreCard";

function HighScores() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        getHighScores()
            .then(items => {
                setScores(items)
            })
            .catch(console.error);
    }, []);

    return (
        <div className="container card-container container-80 flex-between">
            {scores.length ? scores.map(x => <ScoreCard score={x} key={x.id} />) : <div className="no-content"> No content :(</div>}
        </div>
    )
}

export default HighScores;