import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const ControllerToggle = () => {
    const { gameState, setGameState } = useContext(GameContext);

    function toggleVisualController() {
        setGameState(prev => ({ ...prev, hasVisualController: !prev.hasVisualController }));
    }

    return (
        <button disabled={!gameState.level.objects.length} className="button-square order-last" onClick={toggleVisualController}><i className="fas fa-gamepad"></i></button>
    );
};

export default ControllerToggle;