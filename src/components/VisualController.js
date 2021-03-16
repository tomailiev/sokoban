import buttonStyle from '../styles/controllerKey';

function VisualController(props) {

    function handleClick(e) {
        const target = e.target.closest('.Arrow')
        if (target) {
            const targetContext = { key: target.className.split(' ')[1] };
            props.onMove(targetContext);
        }
    }

    return (
        <div className="controller" onClick={(e) => handleClick(e)}>
            <div className="flex-container flex-center">
                <div className="Arrow ArrowUp" style={buttonStyle}><i className="fas fa-chevron-up"></i></div>
            </div>
            <div className="flex-container flex-center">
                <div className="Arrow ArrowLeft" style={buttonStyle}><i className="fas fa-chevron-left"></i></div>
                <div className="Arrow ArrowDown" style={buttonStyle}><i className="fas fa-chevron-down"></i></div>
                <div className="Arrow ArrowRight" style={buttonStyle}><i className="fas fa-chevron-right"></i></div>
            </div>
        </div>
    );
}

export default VisualController;