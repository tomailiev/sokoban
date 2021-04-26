import { useContext } from "react";
import GameContext from "../../contexts/GameContext";

const ControllerToggle = () => {
    const { gameState, dispatch } = useContext(GameContext);

    function toggleVisualController() {
        dispatch({ type: 'toggleController' });
    }

    return (
        <button disabled={!gameState.level.objects.length} className="button-square order-last" onClick={toggleVisualController}><i className="fas fa-gamepad"></i></button>
    );
};

export default ControllerToggle;