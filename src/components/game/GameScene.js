import { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Board from './Board2';
import LevelComplete from './LevelComplete';
import OptionsController from './OptionsController';
import initialGameState from '../../config/initialGameState';
import reducer from '../../config/reducer'
import GameContext from '../../contexts/GameContext';
import UserContext from '../../contexts/UserContext';
import LoadingContext from '../../contexts/LoadingContext';
import { updateUser } from '../../services/user.service';
import { getSingleLevel } from '../../services/level.service';
import { addHighScore } from '../../services/highScores.service';
import { transformToSeconds } from '../../utils/transformToSeconds';
import createUserScore from '../../utils/createUserScore';
import createHighScore from '../../utils/createHighScore';

function GameScene() {
    const { user, setUser } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [gameState, dispatch] = useReducer(reducer, { ...initialGameState, getLevel });

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
                dispatch({type: 'setLevel', payload: level});
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                toast.error(e.message);
            });
    }

    return (
        <GameContext.Provider value={{ gameState, dispatch }}>
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