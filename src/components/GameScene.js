import { useState } from 'react';
import Board from './Board';
import getGameContext from '../utils/getGameContext';
import { getSingleLevel } from '../services/level.service';
import LevelComplete from './LevelComplete';
import Timer from './Timer';
import MovesCounter from './MovesCounter';
import OptionsController from './OptionsController';

function GameScene() {
    const [level, setLevel] = useState({});
    const [isStarted, setIsStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [gameDone, setGameDone] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [moves, setMoves] = useState(0);
    const [hasVisualController, setHasVisualController] = useState(false);

    function getLevel(value) {
        getSingleLevel(value)
            .then(l => {
                setLevel(l);
                setIsComplete(false);
                setShouldReset(true);
                setMoves(0);
            })
            .catch(console.error);
    }

    function levelComplete() {
        setIsComplete(true);
        setIsStarted(false);
        if (level.index === 50) {
            setGameDone(true);
        }
    }

    function hasReset() {
        setShouldReset(true);
        setMoves(0);
    }

    function hasStarted() {
        setShouldReset(false);
        setIsStarted(true);
    }

    function hasMoved() {
        setMoves(moves + 1);
    }

    return (
        <div>
            <OptionsController reset={hasReset} current={level.index} changeLevel={getLevel} toggleController={() => setHasVisualController(!hasVisualController)} />
            <Board
                shouldReset={shouldReset}
                hasReset={() => { setShouldReset(false); setIsStarted(false); }}
                level={level ? Object.assign(level, getGameContext(level.legend)) : null}
                onStarted={hasStarted} onLevelComplete={levelComplete}
                onMove={hasMoved}
                controller={hasVisualController} />
            <div className="container container-50 flex-container flex-between">
                <Timer hasStarted={isStarted} shouldReset={shouldReset} />
                <MovesCounter moves={moves} />
            </div>
            {isComplete
                ? <LevelComplete
                    message={gameDone ? 'Congrats! You beat Sokoban.' : 'Level Complete!'}
                    previousLevel={() => getLevel(level.index - 1)}
                    currentLevel={level.index - 1}
                    nextLevel={() => getLevel(level.index + 1)}
                    done={gameDone} />
                : null
            }
        </div>
    );
}

export default GameScene;