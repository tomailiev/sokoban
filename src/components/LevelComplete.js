
function LevelComplete(props) {

    return (
        <div>
            <h2>{props.message}</h2>
            {!props.done
                ? (<div>
                    <button onClick={props.previousLevel}>Previous Level</button>
                    <button onClick={props.nextLevel}>Next Level</button>
                </div>)
                : ''}
        </div>
    )
}

export default LevelComplete;