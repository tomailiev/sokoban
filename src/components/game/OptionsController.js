import ControllerToggle from "./ControllerToggle";
import LevelSelect from "./LevelSelect";
// import RedoButton from "./RedoButton";
import ResetButton from "./ResetButton";
import ThemeSelect from "./ThemeSelect";
import UndoButton from "./UndoButton";

function OptionsController(props) {


    return (
        <div className="container container-50 flex-container flex-between">
            <UndoButton />
            {/* <RedoButton /> */}
            <ResetButton />
            <ControllerToggle />
            <LevelSelect />
            <ThemeSelect />
        </div>
    );
}

export default OptionsController;