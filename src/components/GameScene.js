import Board from './Board';
import { useEffect, useState } from 'react';
import { getAllOriginalLevels } from '../services/level.service';
import LevelComplete from './LevelComplete';
import Timer from './Timer';
import MovesCounter from './MovesCounter';
import OptionsController from './OptionsController';

function GameScene() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [levels, setLevels] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [gameDone, setGameDone] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [moves, setMoves] = useState(0);
    const [hasVisualController, setHasVisualController] = useState(false);

    useEffect(() => {
        getAllOriginalLevels()
            .then(snapshot => {
                let newLevels = [];
                snapshot.forEach(x => {
                    const data = x.data();
                    newLevels.push([data.levelIndex, data.legend]);
                });
                setLevels(newLevels);
            });
    }, []);

    function getLevel(value) {
        setCurrentLevel(value);
        setIsComplete(false);
        setShouldReset(true);
        setMoves(0);
    }

    function levelComplete() {
        setIsComplete(true);
        setIsStarted(false);
        if (currentLevel === levels.length - 1) {
            setGameDone(true);
        }
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
            <OptionsController levels={levels} current={currentLevel} changeLevel={getLevel} toggleController={() => setHasVisualController(!hasVisualController)} />
            <Board level={levels[currentLevel] ? levels[currentLevel][1] : null} onStarted={hasStarted} onLevelComplete={levelComplete} onMove={hasMoved} controller={hasVisualController} />
            <div className="container container-50 flex-container flex-between">
                <Timer hasStarted={isStarted} shouldReset={shouldReset} />
                <MovesCounter moves={moves} />
            </div>
            {isComplete
                ? <LevelComplete
                    message={gameDone ? 'Congrats! You beat Sokoban.' : 'Level Complete!'}
                    previousLevel={() => getLevel(currentLevel - 1)}
                    currentLevel={currentLevel}
                    nextLevel={() => getLevel(currentLevel + 1)}
                    done={gameDone} />
                : null
            }
        </div>
    );
}

export default GameScene;