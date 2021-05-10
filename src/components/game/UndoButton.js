import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const UndoButton = () => {

    const { gameState, dispatch } = useContext(GameContext);

    return (
        <button disabled={!gameState.undoneObject.length || !gameState.isStarted} className="button-square" onClick={() =>dispatch({ type: 'undo' })}><i className="fas fa-undo"></i></button>
    );
};

export default UndoButton;