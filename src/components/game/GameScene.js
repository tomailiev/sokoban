import { useContext, useEffect, useState } from 'react';
import Board from './Board2';
import getGameContext from '../../utils/getGameContext';
import { getSingleLevel } from '../../services/level.service';
import LevelComplete from './LevelComplete';
import Timer from './Timer';
import MovesCounter from './MovesCounter';
import OptionsController from './OptionsController';
import GameContext from '../../contexts/GameContext';
import UserContext from '../../contexts/UserContext';

const initialState = {
    level: { positions: {}, objects: [] },
    isStarted: false,
    isComplete: false,
    isGameDone: false,
    shouldReset: false,
    hasVisualController: false,
    undo: false,
    undoneObject: [],
    moves: 0,
    theme: 'defaultPics'
}

function GameScene() {
    const [gameState, setGameState] = useState({ ...initialState, getLevel });
    const {user} = useContext(UserContext);

    useEffect(() => {
        getLevel(user.bestLevel);
    }, [user.bestLevel]);

    function getLevel(value) {
        return getSingleLevel(value)
            .then(level => {
                setGameState(prev => ({
                    ...prev,
                    level: Object.assign(level, getGameContext(level.legend)),
                    isComplete: false,
                    shouldReset: true,
                    moves: 0
                }));
            })
            .catch(console.error);
    }

    return (
        <GameContext.Provider value={{ gameState, setGameState }}>
            <OptionsController />
            <Board />
            <div className="container container-50 flex-container flex-between">
                <Timer />
                <MovesCounter />
            </div>
            {gameState.isComplete
                ? <LevelComplete />
                : null
            }
        </GameContext.Provider>
    );
}

export default GameScene;