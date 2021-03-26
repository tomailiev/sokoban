import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const ResetButton = () => {
    const { gameState, setGameState } = useContext(GameContext);

    function handleReset() {
        setGameState(prev => ({...prev, shouldReset: true, moves: 0}));
    }

    return (
        <button disabled={!gameState.isStarted} onClick={handleReset} className="button-square"><i className="fas fa-fast-backward"></i></button>
    );
};

export default ResetButton;