import { useEffect, useState } from "react";
import keyParams from '../config/keyParams';
import getPosition from "../utils/getPosition";
import setPosition from "../utils/setPosition";
import { singleSquareStyle, boardWrapperStyle, pauseMessageStyle } from '../styles'
import pics from '../config/pics';
import VisualController from './VisualController';

function Board(props) {
    const [positions, setPositions] = useState({});
    const [objects, setObjects] = useState([]);
    const [longest, setLongest] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [pauseMessage, setPauseMessage] = useState('Click here to play');

    useEffect(() => {
        if (props.level && props.level !== positions) {
            setPositions(props.level);
            setGameOver(false);
            setLongest(props.longest);
        }
    }, [props.level, props.longest, positions]);

    function updatePositions(oldPosition = [], newPosition = []) {
        setPositions(prev => ({
            ...prev,
            [oldPosition[0]]: oldPosition[1],
            [newPosition[0]]: newPosition[1],
        }));
    }

    function handleMove(newPlayerCoord, newBoxCoord, oldPlayerCoord) {
        const newPlayerPosition = setPosition(...newPlayerCoord);
        if (!positions[newPlayerPosition]) { return; }
        if (positions[newPlayerPosition].length > 1) {
            // const box = positions[newPlayerPosition].substring(1);
            const newBoxPosition = setPosition(...newBoxCoord);
            if (!positions[newBoxPosition] || positions[newBoxPosition].length > 1) { return; }
            updatePositions(
                [newPlayerPosition, positions[newPlayerPosition].substring(0, 1)],
                [newBoxPosition, positions[newBoxPosition] + 'box']
            );
            //CHECK GAME OVER
            const oldPlayerPosition = setPosition(...oldPlayerCoord);
            updatePositions(
                [oldPlayerPosition, positions[oldPlayerPosition].substring(0, 1)],
                [newPlayerPosition, positions[newPlayerPosition] + 'player']
            );
        }
    }

    function handleKeyPress(e) {
        const keyPressed = e.key;
        if (!keyParams[keyPressed] || gameOver) { return; }
        props.onStarted();
        const [playerPosition, _playerValue] = Object.entries(positions).find(x => x[1].includes('player'));
        handleMove(...keyParams[keyPressed](getPosition(playerPosition)));
    }

    function handleGameOver() {
        setGameOver(true);
        props.onLevelComplete();
    }

    return (
        <div>
            <div
                className="game-level-wrapper"
                style={boardWrapperStyle(longest, props?.level?.length)}
                tabIndex="-1"
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={() => setPauseMessage('')}
                onBlur={() => setPauseMessage('Click here to return to the game')}
            >
                {pauseMessage && !props.controller ? <div style={pauseMessageStyle} className="button-oval">{pauseMessage}</div> : null}
                {/* {Object.entries(positions).map(([key, value]) => {
                    if (value.length > 1) {
                        const staticItem = value.substring(0, 1);
                        const dynamicItem = value.substring(1);
                        return (
                            <>
                                <img style={singleSquareStyle(staticItem)} src={pics[staticItem]} key={key + '0'} alt="" />
                                <img style={singleSquareStyle(dynamicItem)} src={pics[dynamicItem]} key={key + '1'} alt="" />
                            </>
                        );
                    } else if (value) {
                        return <img style={singleSquareStyle(value)} src={pics[value]} key={key + '0'} alt="" />;
                    } else {
                        return <img style={singleSquareStyle('brick')} src={pics['brick']} key={key + '0'} alt="" />;
                    }
                })} */}
            </div>
            {props.controller ? <VisualController onMove={(e) => handleKeyPress(e)} /> : null}
        </div>
    );
}