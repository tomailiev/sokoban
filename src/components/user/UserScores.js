import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { transformFromSeconds } from "../../utils/transformToSeconds";
import ScoreCard from "../shared/ScoreCard";

function UserScores() {
    const { user } = useContext(UserContext);

    return (
        <>
            <h2>My high scores</h2>
            <div className="container card-container container-80 flex-center">
                {user.scores
                    ? Object.entries(user.scores).sort((a, b) => b[0] - a[0]).map(([level, { moves, time, total }]) =>
                        <ScoreCard score={Object.assign({ level }, { moves, time: transformFromSeconds(time), total })} key={level} />)
                    : <div className="no-content"> No content :(</div>}
            </div>
        </>
    )
}

export default UserScores;