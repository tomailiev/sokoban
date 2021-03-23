import { useEffect, useState } from "react";
import keyParams from '../config/keyParams';
import getPosition from "../utils/getPosition";
import setPosition from "../utils/setPosition";
import { singleSquareStyle, boardWrapperStyle, pauseMessageStyle } from '../styles'
import pics from '../config/pics';
import VisualController from './VisualController';

function Board(props) {
    const [objects, setObjects] = useState([]);
    // const [undoObjects, setUndoObjects] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [pauseMessage, setPauseMessage] = useState('Click here to play');


    useEffect(() => {
        if (props.level) {
            setGameOver(false);
            setObjects(props.level.objects);
        }
        if (props.shouldReset) { props.hasReset() }
    }, [props.level, props.shouldReset]);

    function updatePositions(object = {}, newPosition = []) {
        // setUndoObjects(prev => prev.unshift(objects));
        // if (undoObjects.length > 3) { undoObjects.pop(); }
        setObjects(prev => (prev.map(x => {
            if (x.id !== object.id) return x;
            return {
                ...x,
                position: newPosition,
                onGoal: props.level.positions[newPosition] === 'goal'
            };
        })));
    }

    function handleMove(player, newPlayerCoord, newBoxCoord) {
        let isGameOver = false;
        const newPlayerPosition = setPosition(...newPlayerCoord);
        if (!props.level.positions[newPlayerPosition]) { return; }
        if (objects.find(x => x.position === newPlayerPosition)) {
            const newBoxPosition = setPosition(...newBoxCoord);
            const box = objects.find(x => x.position === newPlayerPosition);
            if (!props.level.positions[newBoxPosition] || objects.find(x => x.position === newBoxPosition)) { return; }
            updatePositions(box, newBoxPosition);
            if (props.level.positions[newBoxPosition] === 'goal') {
                isGameOver = !(objects.filter(x => x.id !== 'player1' && x.id !== box.id && !x.onGoal)).length;
            }
        }
        updatePositions(player, newPlayerPosition);
        props.onMove();
        if (isGameOver) { handleGameOver() }
    }

    function handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed] || gameOver) { return; }
        props.onStarted();
        const player = objects.find(x => x.id === 'player1');
        handleMove(player, ...keyParams[keyPressed](...getPosition(player.position)));
    }

    function handleGameOver() {
        setGameOver(true);
        props.onLevelComplete();
    }

    return (
        <div>
            <div
                className="game-level-wrapper"
                style={boardWrapperStyle(props.level.longest, props.level.legend?.length)}
                tabIndex="-1"
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={() => setPauseMessage('')}
                onBlur={() => setPauseMessage('Click here to return to the game')}
            >
                {pauseMessage && !props.controller ? <div style={pauseMessageStyle} className="button-oval">{pauseMessage}</div> : null}
                {Object.entries(props.level.positions).map(([key, val]) => {
                    return <img style={singleSquareStyle({ position: key })} src={val ? pics[val] : pics['brick']} key={key} alt="" />;
                })}
                {objects ? objects.map(x => {
                    return <img style={singleSquareStyle(x)} src={pics[x.type]} key={x.id} alt="" />;
                }) : null}
            </div>
            {props.controller ? <VisualController onMove={(e) => handleKeyPress(e)} /> : null}
        </div>
    );
}

export default Board;