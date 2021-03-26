import { controllerContainer, controllerKey } from '../styles';

function VisualController(props) {

    function handleClick(e) {
        const target = e.target.closest('.Arrow')
        if (target) {
            const targetContext = { key: target.className.split(' ')[1] };
            props.onMove(targetContext);
        }
    }

    return (
        <div className="controller" style={controllerContainer} onClick={(e) => handleClick(e)}>
            <div className="flex-container flex-center">
                <div className="Arrow ArrowUp" style={controllerKey}><i className="fas fa-chevron-up"></i></div>
            </div>
            <div className="flex-container flex-center">
                <div className="Arrow ArrowLeft" style={controllerKey}><i className="fas fa-chevron-left"></i></div>
                <div className="Arrow ArrowDown" style={controllerKey}><i className="fas fa-chevron-down"></i></div>
                <div className="Arrow ArrowRight" style={controllerKey}><i className="fas fa-chevron-right"></i></div>
            </div>
        </div>
    );
}

export default VisualController;