import { useCallback, useContext, useEffect, useState } from "react";
import keyParams from '../config/keyParams';
import getPosition from "../utils/getPosition";
import setPosition from "../utils/setPosition";
import { singleSquareStyle, boardWrapperStyle, pauseMessageStyle } from '../styles'
import * as themes from '../themes';
import VisualController from './VisualController';
import GameContext from "../contexts/GameContext";

function Board() {

    const { gameState, setGameState } = useContext(GameContext);
    const [objects, setObjects] = useState([]);
    const [pauseMessage, setPauseMessage] = useState('Click here to play');

    const updateGameState = useCallback((propsToUpdate = {}) => {
        setGameState(prev => ({ ...prev, ...propsToUpdate }));
    }, [setGameState]);

    useEffect(() => {
        if (gameState.level) {
            updateGameState({ isComplete: false });
            setObjects(gameState.level.objects);
        }
        if (gameState.shouldReset) {
            updateGameState({ shouldReset: false, isStarted: false });
        }

    }, [gameState.level, gameState.shouldReset, updateGameState]);

    useEffect(() => {
        if (gameState.undo) {
            updateGameState({ undo: false });
            if (gameState.undoneObject.length) {
                setObjects(gameState.undoneObject);
                updateGameState({ moves: gameState.moves + 1, undoneObject: [] });
            }
        }
    }, [gameState.undo, gameState.undoneObject, updateGameState, gameState.moves]);

    function updatePositions(object = {}, newPosition = []) {
        updateGameState({ undoneObject: objects });
        setObjects(prev => (prev.map(x => {
            if (x.id !== object.id) return x;
            return {
                ...x,
                position: newPosition,
                onGoal: gameState.level.positions[newPosition] === 'goal'
            };
        })));
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
        updateGameState({ moves: gameState.moves + 1 });
        if (isGameOver) {
            updateGameState(
                gameState.level.index === 50
                    ? { isComplete: true, isStarted: false, isGameDone: true, }
                    : { isComplete: true, isStarted: false, }
            );
        }
    }

    function handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed] || gameState.isComplete) { return; }
        if (!gameState.isStarted) {
            updateGameState({ shouldReset: false, isStarted: true });
        }
        const player = objects.find(x => x.id === 'player1');
        handleMove(player, ...keyParams[keyPressed](...getPosition(player.position)));
    }

    return (
        <div>
            <div
                className="game-level-wrapper"
                style={boardWrapperStyle(gameState.level.longest, gameState.level.legend?.length)}
                tabIndex="-1"
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={() => setPauseMessage('')}
                onBlur={() => setPauseMessage('Click here to return to the game')}
            >
                {pauseMessage && !gameState.hasVisualController ? <div style={pauseMessageStyle} className="button-oval">{pauseMessage}</div> : null}
                {Object.entries(gameState.level.positions).map(([key, val]) => {
                    return <img style={singleSquareStyle({ position: key, type: val })} src={val ? themes[gameState.theme || 'defaultPics'][val] : themes[gameState.theme || 'defaultPics']['brick']} key={key} alt="" />;
                })}
                {objects.map(x => {
                    return <img style={singleSquareStyle(x)} src={themes[gameState.theme || 'defaultPics'][x.type]} key={x.id} alt="" />;
                })}
            </div>
            {gameState.hasVisualController ? <VisualController onMove={handleKeyPress} /> : null}
        </div>
    );
}

export default Board;