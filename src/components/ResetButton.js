const ResetButton = (props) => {
    return (
        <button onClick={props.reset} className="button-square"><i className="fas fa-fast-backward"></i></button>
    );
};

export default ResetButton;