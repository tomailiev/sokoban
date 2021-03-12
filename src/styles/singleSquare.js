import squareSize from '../config/squareSize';
import getPosition from '../utils/getPosition';

const singleSquareStyle = (obj) => ({
    position: 'absolute',
    width: squareSize,
    height: 'auto',
    top: getPosition(obj.position)[0] * squareSize,
    left: getPosition(obj.position)[1] * squareSize,
    zIndex: obj.static ? 1 : 50,
    background: obj.type === 'goal' ? 'lightblue' : null,
    transitionProperty: 'left, top',
    transitionDuration: '50ms'
});

export default singleSquareStyle;