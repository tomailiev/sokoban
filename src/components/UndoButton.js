const UndoButton = (props) => {
    return (
        <button className="button-square" onClick={props.undo}><i className="fas fa-undo"></i></button>
    );
};

export default UndoButton;