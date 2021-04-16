import getScoreMessage from "../../utils/getScoreMessage";

function ScoreCard({ score }) {
    return (
        <div className="card flex-20">
            <div className="card-header">
                <h2>Level {score.level}</h2>
                {score.name ? <h5>High score set by {score.name}</h5> : null}
            </div>
            <div className="card-body">
                <h6>Lower is better...</h6>
                <p className="moves">Moves: {score.moves}</p>
                <p className="time">Time: {score.time}</p>
            </div>
            <div className="card-footer">{score.timestamp
                ? new Date(score.timestamp.toDate()).toLocaleDateString()
                : getScoreMessage(score.level)}</div>
        </div>
    )
}

export default ScoreCard;