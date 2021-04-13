import { useContext, useEffect, useState } from "react";
import { getHighScores } from "../services/highScores.service";
import ScoreCard from "./shared/ScoreCard";
import { toast } from 'react-toastify';
import LoadingContext from "../contexts/LoadingContext";
function HighScores() {
    const [scores, setScores] = useState([]);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        setIsLoading(true);
        getHighScores()
            .then(items => {
                setScores(items);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                toast.error(e.message);
            });
    }, [setIsLoading]);

    return (
        <>
            <h2>High Scores</h2>
            <div className="container card-container container-80 flex-between">
                {!isLoading && scores.map(x => <ScoreCard score={x} key={x.id} />)}
            </div>
        </>
    )
}

export default HighScores;