import { useContext, useEffect, useState } from "react";
import keyParams from '../../config/keyParams';
import getPosition from "../../utils/getPosition";
import setPosition from "../../utils/setPosition";
import { singleSquareStyle, boardWrapperStyle, pauseMessageStyle } from '../../styles'
import * as themes from '../../themes';
import VisualController from './VisualController';
import GameContext from "../../contexts/GameContext";
import useResize from "../../hooks/useResize";
import Timer from "./Timer";
import MovesCounter from "./MovesCounter";

function Board() {

    const { gameState, dispatch } = useContext(GameContext);
    const [objects, setObjects] = useState([]);
    const [pauseMessage, setPauseMessage] = useState('Select level above');
    const [squareSize] = useResize(gameState.level.longest);
    useEffect(() => {
        if (gameState.level.objects.length) {
            dispatch({ type: 'ready' })
            setObjects(gameState.level.objects);
            setPauseMessage('Click to play!')
        }
        if (gameState.shouldReset) {
            dispatch({ type: 'reset' })
        }
    }, [gameState.level.objects, gameState.shouldReset, dispatch]);
    useEffect(() => {
        if (gameState.undo) {
            dispatch({ type: 'toggleUndo' });
            if (gameState.undoneObject.length) {
                setObjects(gameState.undoneObject);
                dispatch({ type: 'executeUndo' });
            }
        }
    }, [gameState.undo, gameState.undoneObject, dispatch, gameState.moves]);

    function updatePositions(object = {}, newPosition = []) {
        dispatch({ type: 'setUndo', payload: objects });
        setObjects(prev => (prev.map(x => x.id !== object.id
            ? x
            : {
                ...x,
                position: newPosition,
                onGoal: gameState.level.positions[newPosition] === 'goal'
            }
        )));
    }

    function handleMove(player, newPlayerCoord, newBoxCoord) {
        let isGameOver = false;
        const newPlayerPosition = setPosition(...newPlayerCoord);
        if (!gameState.level.positions[newPlayerPosition]) { return; }
        if (objects.find(x => x.position === newPlayerPosition)) {
            const newBoxPosition = setPosition(...newBoxCoord);
            const box = objects.find(x => x.position === newPlayerPosition);
            if (!gameState.level.positions[newBoxPosition] || objects.find(x => x.position === newBoxPosition)) { return; }
            updatePositions(box, newBoxPosition);
            if (gameState.level.positions[newBoxPosition] === 'goal') {
                isGameOver = !(objects.filter(x => x.id !== 'player1' && x.id !== box.id && !x.onGoal)).length;
            }
        }
        updatePositions(player, newPlayerPosition);
        dispatch({ type: 'move' });
        if (isGameOver) {
            dispatch({ type: 'completeLevel' });
        }
    }

    function handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed] || gameState.isComplete) { return; }
        if (keyPressed === 'u') { dispatch({ type: 'toggleUndo' }); return; }
        if (!gameState.isStarted) {
            dispatch({ type: 'startGame' });
        }
        const player = objects.find(x => x.id === 'player1');
        handleMove(player, ...keyParams[keyPressed](...getPosition(player.position)));
    }

    return (
        <div>
            <div
                className="game-level-wrapper"
                style={boardWrapperStyle(gameState.level.longest, gameState.level.legend?.length, squareSize)}
                tabIndex="-1"
                onKeyDown={handleKeyPress}
                onFocus={() => setPauseMessage('')}
                onBlur={() => setPauseMessage(gameState.level.legend ? 'Click here to return to the game' : 'Select level above')}
            >
                {pauseMessage && !gameState.hasVisualController ? <div style={pauseMessageStyle} className="button-oval">{pauseMessage}</div> : null}
                {Object.entries(gameState.level.positions).map(([key, val]) => {
                    return <img style={singleSquareStyle({ position: key, type: val }, squareSize)} src={val ? themes[gameState.theme || 'defaultPics'][val] : themes[gameState.theme || 'defaultPics']['brick']} key={key} alt="" />;
                })}
                {objects.map(x => {
                    return <img style={singleSquareStyle(x, squareSize)} src={themes[gameState.theme || 'defaultPics'][x.type]} key={x.id} alt="" />;
                })}
            </div>
            <div className="container responsive-container flex-container flex-between">
                <Timer />
                <MovesCounter />
            </div>
            {gameState.hasVisualController && !gameState.isComplete ? <VisualController onMove={handleKeyPress} /> : null}
        </div>
    );
}

export default Board;