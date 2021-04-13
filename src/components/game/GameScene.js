import { useContext, useEffect, useState } from 'react';
import Board from './Board2';
import getGameContext from '../../utils/getGameContext';
import { getSingleLevel } from '../../services/level.service';
import LevelComplete from './LevelComplete';
import OptionsController from './OptionsController';
import GameContext from '../../contexts/GameContext';
import UserContext from '../../contexts/UserContext';
import { updateUser } from '../../services/user.service';
import initialGameState from '../../config/initialGameState';
import { transformToSeconds } from '../../utils/transformToSeconds';
import { addHighScore } from '../../services/highScores.service';
import { toast } from 'react-toastify';
import createUserScore from '../../utils/createUserScore';
import createHighScore from '../../utils/createHighScore';
import LoadingContext from '../../contexts/LoadingContext';

function GameScene() {
    const { user, setUser } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [gameState, setGameState] = useState({ ...initialGameState, getLevel });

    useEffect(() => {
        if (gameState.isComplete) {
            const { id, bestLevel, scores } = user;
            if (!id) { return; }
            let highScore = null;
            const update = {}
            const transformedTime = transformToSeconds(gameState.time);
            if (id &&
                (!scores[gameState.level.index] || scores[gameState.level.index].total > gameState.moves + transformedTime)) {
                update.scores = createUserScore(gameState, transformedTime);
                highScore = createHighScore(gameState, user, transformedTime);
            }
            if (id && bestLevel < gameState.level.index + 1) { update.bestLevel = gameState.level.index + 1 }
            Promise.all([updateUser(user.id, update), addHighScore(highScore)])
                .then(() => setUser(prev => {
                    return {
                        ...prev,
                        bestLevel: update.bestLevel ? update.bestLevel : prev.bestLevel,
                        scores: update.scores
                            ? { ...prev.scores, [gameState.level.index]: update.scores[gameState.level.index] }
                            : prev.scores,
                    }
                }))
                .catch((e) => {
                    toast.error(e.message);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.isComplete]);

    function getLevel(value = user.bestLevel) {
        setIsLoading(true);
        return getSingleLevel(value)
            .then(level => {
                setGameState(prev => ({
                    ...prev,
                    level: Object.assign(level, getGameContext(level.legend)),
                    isComplete: false,
                    shouldReset: true,
                    moves: 0
                }));
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                toast.error(e.message);
            });
    }

    return (
        <GameContext.Provider value={{ gameState, setGameState }}>
            <OptionsController />
            {!isLoading && <Board />}
            {gameState.isComplete
                ? <LevelComplete />
                : null
            }

        </GameContext.Provider>
    );
}

export default GameScene;