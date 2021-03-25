import { useContext } from "react";
import GameContext from "../contexts/GameContext";

const UndoButton = (props) => {

    const { gameState, setGameState } = useContext(GameContext);

    return (
        <button className="button-square" onClick={() => setGameState(prev => ({ ...prev, undo: true }))}><i className="fas fa-undo"></i></button>
    );
};

export default UndoButton;