import ControllerToggle from "./ControllerToggle";
import LevelSelect from "./LevelSelect";
import RedoButton from "./RedoButton";
import UndoButton from "./UndoButton";

function OptionsController(props) {


    return (
        <div className="container container-50 flex-container flex-between">
            <UndoButton />
            <RedoButton />
            <ControllerToggle />
            <LevelSelect handleLevelChange={props.changeLevel} />
            <p>5</p>
            <p>6</p>
        </div>
    );
}

export default OptionsController;