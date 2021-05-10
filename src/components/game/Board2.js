import { useContext } from "react";
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
    const [squareSize] = useResize(gameState.level.longest);

    function updatePositions(object = {}, newPosition = [], isBox) {
        dispatch({ type: 'playerMove', payload: { object, newPosition, isBox } })
    }

    function handleMove(player, newPlayerCoord, newBoxCoord) {
        let isGameOver = false;
        let isBox = false;
        const newPlayerPosition = setPosition(...newPlayerCoord);
        if (!gameState.level.positions[newPlayerPosition]) { return; }
        if (gameState.currentObjects.find(x => x.position === newPlayerPosition)) {
            const newBoxPosition = setPosition(...newBoxCoord);
            const box = gameState.currentObjects.find(x => x.position === newPlayerPosition);
            if (!gameState.level.positions[newBoxPosition] || gameState.currentObjects.find(x => x.position === newBoxPosition)) { return; }
            updatePositions(box, newBoxPosition, isBox);
            isBox = true;
            if (gameState.level.positions[newBoxPosition] === 'goal') {
                isGameOver = !(gameState.currentObjects.filter(x => x.id !== 'player1' && x.id !== box.id && !x.onGoal)).length;
            }
        }
        updatePositions(player, newPlayerPosition, isBox);
        if (isGameOver) {
            dispatch({ type: 'completeLevel' });
        }
    }

    function handleKeyPress(e) {
        const keyPressed = e.key;
        if (keyPressed === 'u') { dispatch({ type: 'undo' }); return; }
        if (keyPressed === 'r') { dispatch({ type: 'reset' }); return; }
        if (!keyParams[keyPressed] || gameState.isComplete) { return; }
        if (!gameState.isStarted) {
            dispatch({ type: 'startGame' });
        }
        const player = gameState.currentObjects.find(x => x.id === 'player1');
        handleMove(player, ...keyParams[keyPressed](...getPosition(player.position)));
    }

    return (
        <div>
            <div
                className="game-level-wrapper"
                style={boardWrapperStyle(gameState.level.longest, gameState.level.legend?.length, squareSize)}
                tabIndex="-1"
                onKeyDown={handleKeyPress}
                onFocus={() => dispatch({type: 'setMessage', payload: ''})}
                onBlur={() => dispatch({type: 'setMessage', payload: gameState.level.legend ? 'Click here to return to the game' : 'Select level above'})}
            >
                {gameState.pauseMessage && !gameState.hasVisualController ? <div style={pauseMessageStyle} className="button-oval">{gameState.pauseMessage}</div> : null}
                {Object.entries(gameState.level.positions).map(([key, val]) => {
                    return <img style={singleSquareStyle({ position: key, type: val }, squareSize)} src={val ? themes[gameState.theme || 'defaultPics'][val] : themes[gameState.theme || 'defaultPics']['brick']} key={key} alt="" />;
                })}
                {gameState.currentObjects.map(x => {
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