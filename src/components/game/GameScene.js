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
import { updateUser } from '../../services/user.service';
import initialGameState from '../../config/initialGameState';

function GameScene() {
    const [gameState, setGameState] = useState({ ...initialGameState, getLevel });
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        function resize() {
            if (gameState.squareSize === 30 && window.innerWidth / gameState.level.longest > 30) { return };
            setGameState(prev => ({
                ...prev, squareSize: window.innerWidth / gameState.level.longest < 30
                    ? window.innerWidth / gameState.level.longest
                    : 30
            }));
        }
        if (window.innerWidth / gameState.level.longest < 30) {
            resize();
        }
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [gameState.level.longest, gameState.squareSize]);

    useEffect(() => {
        if (!gameState.isComplete) {
            getLevel(user.bestLevel);
        }
    }, [user.bestLevel, gameState.isComplete]);

    useEffect(() => {
        if (gameState.isComplete && user.id && user.bestLevel === gameState.level.index) {
            const newBest = user.bestLevel + 1
            updateUser(user.id,
                {
                    bestLevel: newBest,
                    scores: {
                        time: gameState.time,
                        moves: gameState.moves,
                        level: user.bestLevel
                    }
                })
                .then(() => setUser(prev => ({ ...prev, bestLevel: newBest })))
                .catch(console.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.isComplete]);

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