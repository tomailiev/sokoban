import './VisualController.css';

function VisualController(props) {

    function handleClick(e) {
        e.preventDefault();
        const target = e.target.closest('.arrow')
        if (target) {
            const targetContext = { key: target.className.split(' ')[1] };
            props.onMove(targetContext);
        }
    }

    return (
        <div className="controller" onClick={handleClick}>
            <div className="flex-container flex-center">
                <div className="arrow ArrowUp" ><i className="fas fa-chevron-up"></i></div>
            </div>
            <div className="flex-container flex-center">
                <div className="arrow ArrowLeft"><i className="fas fa-chevron-left"></i></div>
                <div className="arrow ArrowDown"><i className="fas fa-chevron-down"></i></div>
                <div className="arrow ArrowRight"><i className="fas fa-chevron-right"></i></div>
            </div>
        </div>
    );
}

export default VisualController;