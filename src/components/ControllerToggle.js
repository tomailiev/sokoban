const ControllerToggle = (props) => {
    return (
        <button className="button-square" onClick={props.toggleController}><i className="fas fa-gamepad"></i></button>
    );
};

export default ControllerToggle;