import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const ResetButton = () => {
    const { gameState, dispatch } = useContext(GameContext);

    function handleReset() {
        dispatch({ type: 'reset' });
    }

    return (
        <button disabled={!gameState.isStarted} onClick={handleReset} className="button-square"><i className="fas fa-fast-backward"></i></button>
    );
};

export default ResetButton;