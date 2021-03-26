import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

function MovesCounter() {

    const { gameState } = useContext(GameContext);

    return (
        <div className="button-square">{gameState.moves}</div>
    );
}

export default MovesCounter;