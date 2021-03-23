import ControllerToggle from "./ControllerToggle";
import LevelSelect from "./LevelSelect";
import RedoButton from "./RedoButton";
import ResetButton from "./ResetButton";
import ThemeSelect from "./ThemeSelect";
import UndoButton from "./UndoButton";

function OptionsController(props) {

    function handleReset() {
        props.reset();
    }

    return (
        <div className="container container-50 flex-container flex-between">
            <UndoButton />
            <RedoButton />
            <ResetButton reset={handleReset} />
            <ControllerToggle toggleController={props.toggleController} />
            <LevelSelect current={props.current} handleLevelChange={props.changeLevel} />
            <ThemeSelect />
        </div>
    );
}

export default OptionsController;