import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const UndoButton = () => {

    const { gameState, dispatch } = useContext(GameContext);

    return (
        <button disabled={!gameState.undoneObject.length || !gameState.isStarted} className="button-square" onClick={() =>/*reduced toggleUndo */ dispatch({ type: 'toggleUndo' })}><i className="fas fa-undo"></i></button>
    );
};

export default UndoButton;