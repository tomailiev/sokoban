import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const UndoButton = () => {

    const { gameState, setGameState } = useContext(GameContext);

    return (
        <button disabled={!gameState.undoneObject.length || !gameState.isStarted} className="button-square" onClick={() => setGameState(prev => ({ ...prev, undo: true }))}><i className="fas fa-undo"></i></button>
    );
};

export default UndoButton;